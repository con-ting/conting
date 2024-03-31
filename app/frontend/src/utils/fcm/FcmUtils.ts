import messaging from '@react-native-firebase/messaging';

export const fetchFCMToken = async setTokenFunction => {
  console.log('FCM 토큰 세팅 시작');
  const token = await messaging().getToken();
  setTokenFunction(token);
  console.log('FCM Token:', token);
  console.log('FCM 토큰 세팅 끝');
};
