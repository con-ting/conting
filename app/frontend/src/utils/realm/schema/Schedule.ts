import {Realm} from '@realm/react';
import Performance from './Performance.ts';

class Schedule extends Realm.Object<Schedule> {
  _id!: Realm.BSON.ObjectId;
  schedule_id!: string;
  performance!: Performance;
  start_time!: string;
  end_time!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Schedule',
    properties: {
      _id: 'objectId',
      schedule_id: 'string',
      performance: 'Performance',
      start_time: 'string',
      end_time: 'string',
    },
    primaryKey: '_id',
  };
}

export default Schedule;
