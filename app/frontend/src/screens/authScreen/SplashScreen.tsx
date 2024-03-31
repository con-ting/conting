import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Color from '../../config/Color';
import {LocalImageLoader} from '../../utils/common/ImageLoader.tsx';
import {useRecoilState} from 'recoil';
import {fcmToken} from '../../utils/recoil/Atoms.ts';
import {fetchFCMToken} from '../../utils/fcm/FcmUtils.ts';
import {saveDataToRealm} from '../../utils/realm/dao/SplashCacheTable.tsx';
import {splashCacheSave} from '../../api/cache/cache.ts';
import {useRealm} from '../../components/realm/RealmContext.ts';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useRecoilState(fcmToken);
  const realm = useRealm();

  useEffect(() => {
    const initialize = async () => {
      // FCM 토큰 가져오기
      console.log('스플레쉬 실행');
      //fcm 토큰 세팅
      await fetchFCMToken(setToken);
      //api
      const apiData = await splashCacheSave();
      // 데이터를 Realm DB에 저장하는 로직

      await saveDataToRealm(realm, apiData); // 이 함수는 실제 로직에 맞게 구현해야 합니다.

      // 모든 초기화 로직이 완료되면 로그인 화면으로 네비게이션
      navigation.navigate('LoginScreen');
    };
    initialize();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="bounceIn" duration={1500}>
        <LocalImageLoader source={require('../../assets/logo/logoPng.png')} />
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.CUTEYELLOW,
  },
  // 스타일 정의 생략
});

export default SplashScreen;
