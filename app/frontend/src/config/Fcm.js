import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission({
        provisional: false, // 임시 권한을 요청할지 여부
    });

    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken(); // 권한이 허용된 경우, FCM 토큰을 가져옴
    }
}

export async function getFcmToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
        // 여기에서 필요한 경우 FCM 토큰을 서버에 저장할 수 있음
    } else {
        console.log('Failed to get FCM token');
    }
}
