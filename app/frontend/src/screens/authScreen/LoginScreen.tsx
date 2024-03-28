import React, {useState, useEffect, useCallback} from 'react';
import {Linking} from 'react-native';
import {Platform, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRecoilState} from 'recoil';
import {
  fcmToken,
  goMainPageState,
  userInfoState,
  walletAdress,
  walletLabel,
  walletPublicKey,
} from '../../utils/recoil/Atoms';
import * as Color from '../../config/Color';

import {PasswordInput, SimpleInput} from '../../components/input/input.tsx';
import {heightPercent, widthPercent} from '../../config/Dimensions.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import {BasicButton, YellowButton} from '../../components/button/Button.tsx';
import * as Typo from '../../config/Typography.tsx';
import {LocalImageLoader} from '../../utils/common/ImageLoader.tsx';
import * as Animatable from 'react-native-animatable';
import {login} from '../../api/auth/auth.ts';
import {setAsync} from '../../utils/async/asyncUtil.ts';
import {useConnection} from '../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {
  useAuthorization,
  Account,
} from '../../components/mobileWalletAdapter/providers/AuthorizationProvider.tsx';
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';

import {PopUpModal} from '../../components/modal/Modal.tsx';
import {MAINBLACK, MAINWHITE, MAINYELLOW, REDBASE} from '../../config/Color';
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

  const [cryptoAddress, setCryptoAddress] = useRecoilState(walletAdress);
  const [cryptoLabel, setCryptoLabel] = useRecoilState(walletLabel);
  const [cryptoPublicKey, setCryptoPublicKey] = useRecoilState(walletPublicKey);
  // const [cryptoAddress, setCryptoAddress] = useState('init walletAdress');
  // const [cryptoLabel, setCryptoLabel] = useState('init walletLabel');
  // const [cryptoPublicKey, setCryptoPublicKey] = useState(
  //   'init walletPublicKey',
  // );

  const [token, setToken] = useRecoilState(fcmToken);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [goMainPage, setGoMainPage] = useRecoilState(goMainPageState);
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  // 모달 관련
  const [changeAddressModalVisible, setChangeAddressModalVisible] =
    useState(false); //체인 주소 변경 감지 모달
  const [changeFcmModalVisible, setChangeFcmModalVisible] = useState(false); //FCM 변경 감지 모달

  useEffect(() => {
    console.log('---------USE EFFECT------');
    console.log('cryptoAddress=', cryptoAddress);
    console.log('cryptoLabel=', cryptoLabel);
    console.log('cryptoPublicKey=', cryptoPublicKey);
    console.log('-------------------------');
  }, [cryptoAddress, cryptoLabel, cryptoPublicKey]);

  const toggleChangeAddressModal = async () => {
    await setChangeAddressModalVisible(!changeAddressModalVisible);
  };

  const toggleChangeFcmModal = async () => {
    await setChangeFcmModalVisible(!changeFcmModalVisible);
  };

  const handleConnectPress = useCallback(async () => {
    let success = false; // 성공 여부를 추적하는 변수
    try {
      if (authorizationInProgress) {
        return false; // 진행 중이면 바로 false 반환
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        const selectedAccount = await authorizeSession(wallet);
        console.log('selectedAccount = ', selectedAccount);
        setCryptoAddress(selectedAccount.address);
        setCryptoLabel(selectedAccount.label);
        setCryptoPublicKey(selectedAccount.publicKey);
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

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('개인 지갑 앱 = ' + account.label);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      setBalance(fetchedBalance);
    },
    [connection],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
    console.log('balance = ', balance);
  }, [fetchAndUpdateBalance, selectedAccount]);

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

  //2. 지갑 앱과 연결 시도
  const walletConnetor = async () => {
    console.log('지갑 연결 시도');
    const walletPass = await handleConnectPress(); // await 추가
    console.log('개인 지갑 잔액 = ' + balance);
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
      return new Error('연결 실패, deeplink 연결');
    }
    //2-2. 연결 성공 시
    console.log('cryptoAddress=', cryptoAddress);
    console.log('cryptoLabel=', cryptoLabel);
    console.log('cryptoPublicKey=', cryptoPublicKey);
    console.log('selectedAccount=', selectedAccount);
    console.log('지갑 연결 성공');
  };

  //3. 토큰 및 userAgent 저장
  const userDataSetting = async (props: any) => {
    console.log('loginUserResponseData.token = ', props.token);
    console.log('loginUserResponseData.user = ', props.user);
    await setAsync('accessToken', props.token.accessToken);
    await setAsync('refreshToken', props.token.refreshToken);
    await setAsync('userId', props.user.id);
  };

  //4. 연결 주소 검증
  const validationAddress = async (props: any) => {
    console.log('cryptoAddress=', cryptoAddress);
    console.log('cryptoLabel=', cryptoLabel);
    console.log('cryptoPublicKey=', cryptoPublicKey);
    console.log('selectedAccount=', selectedAccount);
    if (cryptoPublicKey != props.user.wallet) {
      console.log('월렛주소가 다름');
      console.log('cryptoPublicKey = ', cryptoPublicKey);
      console.log('loginResponse.user.wallet = ', props.user.wallet);
      //4-1. 주소가 다를 시 모달 생성
      await toggleChangeAddressModal();
    }
  };

  //5. FCM 토큰 검증
  const validationFcm = async (props: any) => {
    if (token != props.user.fcmToken) {
      console.log('FCM 토큰이 다름');
      console.log('token = ', token);
      console.log('loginResponse.user.fcmToken = ', props.user.fcmToken);
      //5-1. 토큰이 다를 시 모달 생성

      await toggleChangeFcmModal();
    }
  };
  const loginButtonPress = async () => {
    //promise all 사용해서 순서대로 수행, 수행중 에러가 1개라도 있다면 종료
    const userResponse = await loginApiSender(); //1. 로그인 API 요청
    console.log('로그인 API 요청 끝');
    await walletConnetor(); //2. 지갑 앱과 연결 시도
    console.log('지갑 앱과 연결 시도 끝');
    console.log('토큰 및 userAgent 저장 시작');
    await userDataSetting(userResponse); //3. 토큰 및 userAgent 저장
    console.log('cryptoAddress=', cryptoAddress);
    console.log('cryptoLabel=', cryptoLabel);
    console.log('cryptoPublicKey=', cryptoPublicKey);
    console.log('selectedAccount=', selectedAccount);
    console.log('토큰 및 userAgent 저장 끝');

    console.log('연결 주소 검증 시작');
    await validationAddress(userResponse); //4. 연결 주소 검증
    console.log('연결 주소 검증 끝');
    console.log('FCM 토큰 검증 시작');
    await validationFcm(userResponse); //5. FCM 토큰 검증
    console.log('FCM 토큰 검증 끝');

    //6. 전역 상태에 유저 정보 저장
    console.log('전역 상태에 유저 정보 저장 시작');
    await setUserInfo({
      user_id: userResponse.user.id,
      user_email: userResponse.user.email,
      fcm: token,
      cryptoAddress: cryptoAddress,
      cryptoLabel: cryptoLabel,
      cryptoPublicKey: cryptoPublicKey,
    });
    console.log('전역 상태에 유저 정보 저장 끝');
    //7. goMainPage 수정
    console.log('goMainPage 수정 시작');
    await setGoMainPage(true);
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
            <TouchableOpacity onPress={toggleChangeAddressModal}>
              <Typo.DETAIL2 color={'#98A2B3'}>이메일 찾기</Typo.DETAIL2>
            </TouchableOpacity>
            <Typo.DETAIL2 color={'#98A2B3'}> | </Typo.DETAIL2>
            <TouchableOpacity onPress={toggleChangeFcmModal}>
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

      {/* FCM 변경 시 모달 */}
      <PopUpModal
        isVisible={changeFcmModalVisible}
        backGroundColor={MAINWHITE}
        disableBackdropPress={true}
        setIsVisible={setChangeFcmModalVisible}>
        <View style={{padding: widthPercent(4)}}>
          <Typo.DETAIL1 color={MAINYELLOW}>
            기존에 사용하던 휴대폰과 다른것 같아요!
          </Typo.DETAIL1>
          <Spacer space={heightPercent(4)} />
          <Typo.DETAIL1 color={MAINYELLOW}>
            주 사용 휴대폰으로 등록하시겠습니까?
          </Typo.DETAIL1>
          <Spacer space={10} />
          <Typo.DETAIL2 color={REDBASE}>주의사항</Typo.DETAIL2>
          <Spacer space={10} />
          <Typo.DETAIL2 color={MAINBLACK}>
            1. 등록 시, 현재 핸드폰으로 구매한 티켓은 현재 핸드폰으로만 사용이
            가능합니다.
          </Typo.DETAIL2>
          <Spacer space={heightPercent(4)} />
          <Typo.DETAIL2 color={MAINBLACK}>
            2. 이 전의 핸드폰으로 구매한 티켓은 현재 핸드폰에서 사용이
            불가능합니다.
          </Typo.DETAIL2>
          <Spacer space={heightPercent(20)} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <BasicButton
              onPress={async () => {
                //변경하지 않는다고 했을 때, 로직
                await setToken(loginUserResponseData.user.fcmToken);
                await toggleChangeFcmModal();
              }}
              width="50%"
              borderRadius={8}
              backgroundColor={MAINWHITE}
              borderColor={MAINYELLOW}>
              <Typo.DETAIL2 color={MAINBLACK}>바꾸지 않기</Typo.DETAIL2>
            </BasicButton>
            <YellowButton
              onPress={async () => {
                //변경 한다고 했을 때, 로직
                //서버에 변경 요청
                await updateUserFcmAndWallet({fcm: token});
                await toggleChangeFcmModal();
              }}
              isRadius={false}
              btnText={'등록하기'}
              width="50%"
            />
          </View>
        </View>
      </PopUpModal>

      {/* 지갑 주소 변경 시 모달 */}
      <PopUpModal
        isVisible={changeAddressModalVisible}
        backGroundColor={MAINWHITE}
        disableBackdropPress={true}
        setIsVisible={setChangeAddressModalVisible}>
        <View style={{padding: widthPercent(4)}}>
          <Typo.DETAIL1 color={MAINYELLOW}>
            기존 지갑 주소와 다른것 같아요!
          </Typo.DETAIL1>
          <Spacer space={heightPercent(4)} />
          <Typo.DETAIL1 color={MAINYELLOW}>
            지갑 주소를 변경 해서 로그인 하시겠습니까?
          </Typo.DETAIL1>
          <Spacer space={heightPercent(8)} />
          <Typo.DETAIL2 color={REDBASE}>주의 사항</Typo.DETAIL2>
          <Spacer space={heightPercent(8)} />
          <Typo.DETAIL2 color={MAINBLACK}>
            1. 지갑 주소를 변경 시, 해당 지갑의 잔액 및 NFT 티켓으로 서비스를
            이용하게 됩니다.
          </Typo.DETAIL2>
          <Spacer space={heightPercent(4)} />
          <Typo.DETAIL2 color={MAINBLACK}>
            2. 변경을 원하지 않는 경우 사용하시는 블록체인 지갑 어플리케이션의
            주소를 바꿔주세요!
          </Typo.DETAIL2>
          <Spacer space={heightPercent(20)} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <BasicButton
              onPress={async () => {
                new Error(
                  '가입 시 등록된 지갑 주소와, 연결된 지갑 주소가 일치하지 않음',
                );
                await toggleChangeAddressModal();
              }}
              width="50%"
              borderRadius={8}
              backgroundColor={MAINWHITE}
              borderColor={MAINYELLOW}>
              <Typo.DETAIL2 color={MAINBLACK}>지갑 유지</Typo.DETAIL2>
            </BasicButton>
            <YellowButton
              onPress={async () => {
                //변경 한다고 했을 때, 로직
                await setCryptoAddress(cryptoPublicKey);
                //서버에 변경 요청
                await updateUserFcmAndWallet({wallet: cryptoPublicKey});
                await toggleChangeAddressModal();
              }}
              isRadius={false}
              btnText={'지갑 변경'}
              width="50%"
            />
          </View>
        </View>
      </PopUpModal>
    </SafeAreaView>
  );
};

export default LoginScreen;
