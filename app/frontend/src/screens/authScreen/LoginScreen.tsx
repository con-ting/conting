import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, Platform, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRecoilState} from 'recoil';
import {
  fcmToken,
  goMainPageState,
  userInfoState,
} from '../../utils/recoil/Atoms';
import * as Color from '../../config/Color';

import {PasswordInput, SimpleInput} from '../../components/input/input.tsx';
import {heightPercent, widthPercent} from '../../config/Dimensions.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import {YellowButton} from '../../components/button/Button.tsx';
import * as Typo from '../../config/Typography.tsx';
import {LocalImageLoader} from '../../utils/common/ImageLoader.tsx';
import * as Animatable from 'react-native-animatable';
import {login} from '../../api/auth/auth.ts';
import {setAsync} from '../../utils/async/asyncUtil.ts';
import {useAuthorization} from '../../components/mobileWalletAdapter/providers/AuthorizationProvider.tsx';
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {updateUserFcmAndWallet} from '../../api/auth/user.ts';

type RootStackParamList = {
  LoginScreen: undefined;
  PhoneAuthScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [goMainPage, setGoMainPage] = useRecoilState(goMainPageState);
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const {selectedAccount} = useAuthorization();
  const [token, setToken] = useRecoilState(fcmToken);

  const handleConnectPress = useCallback(async () => {
    let success = false; // 성공 여부를 추적하는 변수
    try {
      if (authorizationInProgress) {
        return false; // 진행 중이면 바로 false 반환
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        await authorizeSession(wallet);
      });
      success = true; // 연결 성공
    } catch (err: any) {
      console.log(
        '연결 중 에러 발생',
        err instanceof Error ? err.message : err,
      );
    } finally {
      setAuthorizationInProgress(false);
      return success; // 여기서 성공 여부 반환
    }
  }, [authorizationInProgress, authorizeSession]);
  // 각각의 버튼에 대한 실행될 링크(url)와 링크가 실행되지 않을 때 대체 링크(alterUrl)
  const deepLinkEvent = useCallback(async (url: string, alterUrl: string) => {
    // 만약 어플이 설치되어 있으면 true, 없으면 false
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // 설치되어 있으면
      await Linking.openURL(url);
    } else {
      // 앱이 없으면
      await Linking.openURL(alterUrl);
    }
  }, []);

  //1. 로그인 API 요청
  const loginApiSender = async () => {
    const loginResponse = await login({
      email: email,
      password: password,
    });
    return loginResponse;
  };

  //3. 토큰 및 userAgent 저장
  const userDataSetting = async (props: any) => {
    console.log('loginUserResponseData.token = ', props.token);
    console.log('loginUserResponseData.user = ', props.user);
    await setAsync('accessToken', props.token.accessToken);
    await setAsync('refreshToken', props.token.refreshToken);
    await setAsync('userId', props.user.id);
  };

  const loginButtonPress = async () => {
    //promise all 사용해서 순서대로 수행, 수행중 에러가 1개라도 있다면 종료
    const userResponse = await loginApiSender(); //1. 로그인 API 요청
    // console.log('로그인 API 요청 끝');
    await userDataSetting(userResponse); //3. 토큰 및 userAgent 저장

    // 4. 커넥션 요청
    // 여기부터 팬텀 연결로직 들어가서 주소 가져와야합니다.
    console.log('지갑 연결 시도');
    const walletPass = await handleConnectPress(); // await 추가
    if (!walletPass) {
      //2-1. 연결 실패 시
      if (Platform.OS === 'android') {
        deepLinkEvent(
          'market://details?id=app.phantom',
          'https://play.google.com/store/apps/details?id=app.phantom',
        );
      } else {
        deepLinkEvent(
          "itms-apps://itunes.apple.com/us/app/id1598432977?mt=8'",
          'https://apps.apple.com/kr/app/phantom-crypto-wallet/id1598432977',
        );
      }
      return;
    }
    //2-2. 연결 성공 시
    console.log('지갑 연결 성공');
    console.log('userResponse.user.fcmToken', userResponse.user.fcmToken);
    console.log('token', token);
    if (token !== userResponse.user.fcmToken) {
      Alert.alert('알림', '사용환경이 달라지신거 같아요.', [
        {
          text: '변경',
          onPress: async () => {
            await updateUserFcmAndWallet({fcm: token});
          },
        },
        {
          text: '변경안함',
        },
      ]);
    }

    //4. 전역 상태에 유저 정보 저장
    console.log('전역 상태에 유저 정보 저장 시작');
    setUserInfo({
      user_id: userResponse.user.id,
      user_email: userResponse.user.email,
      walletAddress: userResponse.user.wallet,
    });
    console.log('전역 상태에 유저 정보 저장 끝');
    //5. goMainPage 수정
    console.log('goMainPage 수정 시작');
    setGoMainPage(true);
    console.log('goMainPage 수정 끝');
  };

  // @ts-ignore
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: widthPercent(10),
        backgroundColor: Color.CUTEYELLOW,
      }}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center', // 컨텐츠를 세로 방향으로 가운데 정렬
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* intro title 부분 */}
          <Animatable.View animation="bounceIn" duration={1500}>
            <LocalImageLoader
              source={require('../../assets/logo/logoPng.png')}
            />
          </Animatable.View>
          {/* 로그인 정보 input 부분 */}
          <SimpleInput
            placeholder="이메일 입력"
            value={email}
            backGroundColor={Color.CUTEYELLOW}
            textColor={Color.MAINBLACK}
            onChangeText={email => setEmail(email)}
          />
          <Spacer space={8} />
          <PasswordInput
            placeholder="비밀번호 입력"
            value={password}
            onChangeText={password => setPassword(password)}
            isForNewEnter={true}
            backGroundColor={Color.CUTEYELLOW}
            textColor={Color.MAINBLACK}
          />
          <Spacer space={20} />
          {/* 로그인 버튼 부분 */}
          <YellowButton onPress={loginButtonPress} btnText={'로그인'} />
          <Spacer space={20} />
          {/* 이메일 찾기, 비밀번호 찾기, 회원가입 부분 */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => Alert.alert('후순위')}>
              <Typo.DETAIL2 color={'#98A2B3'}>이메일 찾기</Typo.DETAIL2>
            </TouchableOpacity>
            <Typo.DETAIL2 color={'#98A2B3'}> | </Typo.DETAIL2>
            <TouchableOpacity onPress={() => Alert.alert('후순위')}>
              <Typo.DETAIL2 color={'#98A2B3'}>비밀번호 찾기</Typo.DETAIL2>
            </TouchableOpacity>
            <Typo.DETAIL2 color={'#98A2B3'}> | </Typo.DETAIL2>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PhoneAuthScreen');
              }}>
              <Typo.DETAIL2 color={'#98A2B3'}>회원가입</Typo.DETAIL2>
            </TouchableOpacity>
          </View>
          <Spacer space={40} />
          {/* 소셜 로그인 부분 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: 2,
                width: widthPercent(100),
                marginHorizontal: widthPercent(8),
              }}
            />
            <Typo.DETAIL3 color="#98A2B3">SNS 계정으로 로그인</Typo.DETAIL3>
            <View
              style={{
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: 2,
                width: widthPercent(100),
                marginHorizontal: widthPercent(8),
              }}
            />
          </View>
          <Spacer space={40} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LocalImageLoader
              source={require('../../assets/sns/naver.png')}
              style={{
                height: heightPercent(35),
                aspectRatio: 1,
                borderRadius: 100,
                marginHorizontal: widthPercent(14),
              }}
            />
            <LocalImageLoader
              source={require('../../assets/sns/kakao.png')}
              style={{
                backgroundColor: '#FEC84B',
                height: heightPercent(35),
                aspectRatio: 1,
                borderRadius: 100,
                marginHorizontal: widthPercent(14),
              }}
            />
            <View
              style={{
                backgroundColor: Color.MAINWHITE,
                height: heightPercent(35),
                aspectRatio: 1,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: widthPercent(14),
                borderColor: '#E4E7EC',
                borderWidth: 1,
              }}>
              <LocalImageLoader
                source={require('../../assets/sns/google.png')}
                style={{
                  height: heightPercent(22),
                  aspectRatio: 1,
                  borderRadius: 100,
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
