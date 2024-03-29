import {Realm} from '@realm/react';

class Hall extends Realm.Object<Hall> {
  _id!: Realm.BSON.ObjectId;
  hall_id!: string;
  name!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Hall',
    properties: {
      _id: 'objectId',
      hall_id: 'string',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

export default Hall;
