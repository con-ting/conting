import {atom} from 'recoil';

/**
 * token확인 후 main으로 갈지에 대한 정보를 저장하고 있을 상태 atom입니다.
 * 이 값이 true가 되었을 때, main페이지로 진입합니다.
 * @author 김형민
 */
export const goMainPageState = atom<boolean>({
  key: 'goMainPageState',
  default: false,
});

// TODO
// 실제 데이터 받았을 때 추가할 것
type UserInfoStateType = {
  user_id: number;
  user_email: string;
};
/**
 * user의 정보를 저장하고 있을 상태 atom입니다.
 * @author 김형민
 */
export const userInfoState = atom<null | UserInfoStateType>({
  key: 'userInfoState',
  default: {
    user_id: 1,
    user_email: '',
  },
});

/**
 * FCM Token 을 담고 있는 atom입니다.
 * @author 김형민
 */
export const fcmToken = atom<string>({
  key: 'fcmToken',
  default: '',
});
