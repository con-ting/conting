// RealmContext.ts
import {createRealmContext} from '@realm/react';
import Hall from '../../utils/realm/schema/Hall';
import Performance from '../../utils/realm/schema/Performance';
import Schedule from '../../utils/realm/schema/Schedule';
// 마이그레이션 함수 정의
const migration = (oldRealm, newRealm) => {
  for (const model of ['Hall', 'Performance', 'Schedule']) {
    const oldObjects = oldRealm.objects(model);
    newRealm.delete(oldObjects); // 모든 데이터 삭제
  }
};
const {RealmProvider, useRealm} = createRealmContext({
  schema: [Hall, Performance, Schedule],
  schemaVersion: 4, // 스키마 버전 업데이트
  migration: migration, // 모든 데이터 삭제, // 마이그레이션 함수 적용
});

export {RealmProvider, useRealm};
