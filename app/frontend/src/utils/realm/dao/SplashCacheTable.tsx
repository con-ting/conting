import Realm from '@realm/react';
import Hall from '../schema/Hall.ts';
import Performance from '../schema/Performance.ts';
import Schedule from '../schema/Schedule.ts';
import {BSON} from 'realm';
const {ObjectId} = BSON;

type PerformanceApi = {
  performance_id: string;
  title: string;
  poster_image: string;
  description_image: string;
  hall_id: string;
  reservation_start_datetime: string;
  reservation_end_datetime: string;
  start_date: string;
  end_date: string;
};
type HallApi = {
  id: string;
  name: string;
  address: string;
};
type ScheduleApi = {
  schedule_id: string;
  performance_id: string;
  start_time: string;
  end_time: string;
};
// 예제 데이터
type ApiData = {
  performances: Array<PerformanceApi>; // 생략: 위에서 제공된 performances 배열];
  halls: Array<HallApi>; // 생략: 위에서 제공된 halls 배열];
  schedules: Array<ScheduleApi>; // 생략: 위에서 제공된 schedules 배열];
};

export async function saveDataToRealm(realm: Realm.Realm, data: ApiData) {
  console.log('캐쉬데이터 저장 시작');
  try {
    realm.write(() => {
      // 홀 데이터 저장
      data.halls.forEach(hall => {
        realm.create(
          'Hall',
          {
            hall_id: String(hall.id),
            name: hall.name,
            address: hall.address,
          },
          'modified',
        );
      });

      // 공연 데이터 저장
      data.performances.forEach(performance => {
        realm.create(
          'Performance',
          {
            performance_id: String(performance.performance_id),
            title: performance.title,
            images: performance.description_image,
            poster_image: performance.poster_image,
            hall_id: String(performance.hall_id),
            reservation_start_datetime: performance.reservation_start_datetime,
            reservation_end_datetime: performance.reservation_end_datetime,
            start_date: performance.start_date,
            end_date: performance.end_date,
          },
          'modified',
        );
      });

      // 스케줄 데이터 저장
      data.schedules.forEach(schedule => {
        realm.create(
          'Schedule',
          {
            schedule_id: String(schedule.schedule_id),
            performance_id: String(schedule.performance_id),
            start_time: schedule.start_time,
            end_time: schedule.end_time,
          },
          'modified',
        );
      });
    });
    console.log('캐쉬데이터 저장 끝');
  } catch (e) {
    console.error('realm 에러', e);
  }
}
