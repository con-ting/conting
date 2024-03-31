import {Realm} from '@realm/react';
import Hall from './Hall';

class Performance extends Realm.Object<Performance> {
  performance_id!: string;
  title!: string;
  images!: string;
  poster_image!: string;
  hall_id!: string;
  reservation_start_datetime!: string;
  reservation_end_datetime!: string;
  start_date!: string;
  end_date!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Performance',
    properties: {
      performance_id: 'string',
      title: 'string',
      images: 'string',
      poster_image: 'string',
      hall_id: 'string',
      reservation_start_datetime: 'string',
      reservation_end_datetime: 'string',
      start_date: 'string',
      end_date: 'string',
    },
    primaryKey: 'performance_id',
  };
}

export default Performance;
