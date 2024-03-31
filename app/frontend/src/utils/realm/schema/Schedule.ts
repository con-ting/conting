import {Realm} from '@realm/react';
import Performance from './Performance.ts';

class Schedule extends Realm.Object<Schedule> {
  schedule_id!: string;
  performance_id!: string;
  start_time!: string;
  end_time!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Schedule',
    properties: {
      schedule_id: 'string',
      performance_id: 'string',
      start_time: 'string',
      end_time: 'string',
    },
    primaryKey: 'schedule_id',
  };
}

export default Schedule;
