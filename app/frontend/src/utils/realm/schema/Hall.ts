import {Realm} from '@realm/react';

class Hall extends Realm.Object<Hall> {
  hall_id!: string;
  name!: string;
  address!: string;
  static schema: Realm.ObjectSchema = {
    name: 'Hall',
    properties: {
      hall_id: 'string',
      name: 'string',
      address: 'string',
    },
    primaryKey: 'hall_id',
  };
}

export default Hall;
