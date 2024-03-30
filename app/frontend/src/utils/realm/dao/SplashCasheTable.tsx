import Realm from '@realm/react';
import Hall from '../schema/Hall.ts';
import Performance from '../schema/Performance.ts';
import Schedule from '../schema/Schedule.ts';
type PerformanceApi = {
  performance_id: number;
  title: string;
  poster_image: string;
  description_image: string;
  hall_id: number;
  reservation_start_datetime: string;
  reservation_end_datetime: string;
  start_date: string;
  end_date: string;
};
type HallApi = {
  id: number;
  name: string;
  address: string;
};
type ScheduleApi = {
  schedule_id: number;
  performance_id: number;
  start_time: string;
  end_time: string;
};
// 예제 데이터
type ApiData = {
  performances: Array<PerformanceApi>; // 생략: 위에서 제공된 performances 배열];
  halls: Array<HallApi>; // 생략: 위에서 제공된 halls 배열];
  schedules: Array<ScheduleApi>; // 생략: 위에서 제공된 schedules 배열];
};

export async function saveDataToRealm(data: ApiData) {
  const realm = await Realm.open({
    schema: [Hall.schema, Performance.schema, Schedule.schema],
    path: 'myRealm.realm', // 데이터베이스 파일명 지정 (옵션)
  });

  try {
    realm.write(() => {
      // 홀 데이터 저장
      data.halls.forEach(hall => {
        realm.create('Hall', {
          _id: new Realm.BSON.ObjectId(),
          hall_id: String(hall.id),
          name: hall.name,
          address: hall.address,
        });
      });

      // 공연 데이터 저장
      data.performances.forEach(performance => {
        const hall = realm.objectForPrimaryKey(
          'Hall',
          String(performance.hall_id),
        );
        realm.create('Performance', {
          _id: new Realm.BSON.ObjectId(),
          performance_id: String(performance.performance_id),
          title: performance.title,
          images: performance.description_image,
          poster_image: performance.poster_image,
          hall: hall,
          reservation_start_datetime: performance.reservation_start_datetime,
          reservation_end_datetime: performance.reservation_end_datetime,
          start_date: performance.start_date,
          end_date: performance.end_date,
        });
      });

      // 스케줄 데이터 저장
      data.schedules.forEach(schedule => {
        const performance = realm.objectForPrimaryKey(
          'Performance',
          String(schedule.performance_id),
        );
        realm.create('Schedule', {
          _id: new Realm.BSON.ObjectId(),
          schedule_id: String(schedule.schedule_id),
          performance: performance,
          start_time: schedule.start_time,
          end_time: schedule.end_time,
        });
      });
    });
  } catch (e) {
    console.error('realm 에러', e);
  } finally {
    // DB 사용 후 닫기 (필요에 따라)
    realm.close();
  }
}
