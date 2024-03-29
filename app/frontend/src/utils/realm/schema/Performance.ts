import {Realm} from '@realm/react';
import Hall from './Hall';

class Performance extends Realm.Object<Performance> {
  _id!: Realm.BSON.ObjectId;
  performance_id!: string;
  title!: string;
  images!: string;
  poster_image!: string;
  hall!: Hall; // Hall 객체를 직접 참조합니다.
  reservation_start_datetime!: string;
  reservation_end_datetime!: string;
  start_date!: string;
  end_date!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Performance',
    properties: {
      _id: 'objectId',
      performance_id: 'string',
      title: 'string',
      images: 'string',
      poster_image: 'string',
      hall: 'Hall', // Hall 객체와의 1:1 관계를 정의합니다.
      reservation_start_datetime: 'string',
      reservation_end_datetime: 'string',
      start_date: 'string',
      end_date: 'string',
      primaryKey: '_id',
    },
  };
}

export default Performance;
