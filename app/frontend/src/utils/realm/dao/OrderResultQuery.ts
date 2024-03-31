import Realm from '@realm/react';

export function fetchScheduleDetails(realm: Realm.Realm, scheduleId: number) {
  let details = null;

  // Schedule 모델에서 특정 schedule_id에 해당하는 데이터를 조회
  const schedule = realm.objectForPrimaryKey('Schedule', String(scheduleId));

  if (schedule) {
    // 연관된 Performance 정보 조회
    const performance = realm.objectForPrimaryKey(
      'Performance',
      String(schedule.performance_id),
    );

    // 연관된 Hall 정보 조회 (Performance가 존재할 때만 조회)
    const hall = performance
      ? realm.objectForPrimaryKey('Hall', String(performance.hall_id))
      : null;

    // 최종 데이터 객체 구성
    details = {
      schedule_id: String(schedule.schedule_id),
      performance_id: performance ? String(performance.performance_id) : '',
      img: performance ? performance.poster_image : '',
      title: performance ? performance.title : '',
      hall_location: hall ? hall.address : '',
      hall_name: hall ? hall.name : '',
      reservation_start_datetime: performance
        ? performance.reservation_start_datetime
        : '',
      reservation_end_datetime: performance
        ? performance.reservation_end_datetime
        : '',
      start_date: performance ? performance.start_date : '',
      start_end_date: performance ? performance.end_date : '',
      start_time: schedule.start_time,
      end_time: schedule.end_time,
    };
  }

  return details;
}
