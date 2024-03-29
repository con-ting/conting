import {createRealmContext} from '@realm/react';
import Hall from '../../utils/realm/schema/Hall';
import Performance from '../../utils/realm/schema/Performance';
import Schedule from '../../utils/realm/schema/Schedule';

const RealmContext = createRealmContext({
  schema: [Hall, Performance, Schedule],
});

export default RealmContext;
