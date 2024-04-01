import {Alert, Platform, Text, View} from 'react-native';
import {H3} from '../../config/Typography.tsx';
import {PasswordInput, SimpleInput} from '../../components/input/input.tsx';
import React, {useCallback, useEffect, useState} from 'react';
import * as Color from '../../config/Color.ts';
import {Linking} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions.tsx';
import {
  BasicButton,
  WhiteButton,
  YellowButton,
} from '../../components/button/Button.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import * as Typo from '../../config/Typography.tsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PopUpModal, SlideModal} from '../../components/modal/Modal.tsx';
import {
  MAINBLACK,
  MAINGRAY,
  MAINWHITE,
  MAINYELLOW,
} from '../../config/Color.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {userJoin} from '../../api/auth/user.ts';
import {useRecoilState} from 'recoil';
import {
  fcmToken,
  goMainPageState,
  userInfoState,
} from '../../utils/recoil/Atoms.ts';
import {
  korDateFormat,
  serverDateFormat,
} from '../../utils/common/TimeFormat.ts';
import DatePicker from 'react-native-date-picker';
import * as Font from '../../config/Font.ts';
import {emailConfirm, login} from '../../api/auth/auth.ts';
import {setAsync} from '../../utils/async/asyncUtil.ts';
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';

import {
  Account,
  useAuthorization,
} from '../../components/mobileWalletAdapter/providers/AuthorizationProvider.tsx';
import {useConnection} from '../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';

type RootStackParamList = {
  PhoneAuthScreen: undefined;
  LoginScreen: undefined;
  JoinScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const JoinScreen = propsData => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [emailPass, setEmailPass] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [token, setToken] = useRecoilState(fcmToken);
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoLabel, setCryptoLabel] = useState('');
  const [cryptoPublicKey, setCryptoPublicKey] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false); // < 버튼 눌렀을 때 모달
  const phoneNumber = propsData.route.params.replace(/-/g, '');
  const [goMainPage, setGoMainPage] = useRecoilState(goMainPageState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

  const toggleCancelModal = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  const abledButton = emailPass && password === rePassword && password !== '';

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

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      await setCryptoAddress(account.address);
      console.log('앱 주소 =: ' + account.address);
      await setCryptoPublicKey(account.publicKey);
      console.log('개인 지갑 주소 =: ' + account.publicKey);
      await setCryptoLabel(account.label ? account.label : '');
      console.log('개인 지갑 앱 = ' + account.label);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('개인 지갑 잔액 = ' + fetchedBalance);
      await setBalance(fetchedBalance);
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

  //3. 토큰 및 userAgent 저장
  const userDataSetting = async (props: any) => {
    console.log('loginUserResponseData.token = ', props.token);
    console.log('loginUserResponseData.user = ', props.user);
    await setAsync('accessToken', props.token.accessToken);
    await setAsync('refreshToken', props.token.refreshToken);
    await setAsync('userId', props.user.id);
  };
  const connect = async () => {
    //1. 여기부터 팬텀 연결로직 들어가서 주소 가져와야합니다.
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
      return;
    }
    //2-2. 연결 성공 시
    console.log('지갑 연결 성공');
    console.log('cryptoPublicKey=', cryptoPublicKey);
    //2. 회원가입 API 전송
    if (cryptoPublicKey !== '') {
      await userJoin({
        email: email,
        password: password,
        name: userName,
        phone_number: phoneNumber,
        birthday: serverDateFormat(birthDate),
        fcm: token,
        wallet: cryptoPublicKey,
      });
      console.log('회원가입 성공');
    } else {
      Alert.alert('오류', '지갑 연동 실패.', [{text: '닫기', style: 'cancel'}]);
      Error('주소 가져오기 실패');
    }

    const userResponse = await loginApiSender(); //1. 로그인 API 요청
    // console.log('로그인 API 요청 끝');
    await userDataSetting(userResponse); //3. 토큰 및 userAgent 저장
    //4. 전역 상태에 유저 정보 저장
    console.log('전역 상태에 유저 정보 저장 시작');
    await setUserInfo({
      user_id: userResponse.user.id,
      user_email: userResponse.user.email,
      walletAddress: userResponse.user.wallet,
    });
    console.log('전역 상태에 유저 정보 저장 끝');
    //5. goMainPage 수정
    console.log('goMainPage 수정 시작');
    await setGoMainPage(true);
    console.log('goMainPage 수정 끝');
  };

  const validateEmail = async (): boolean => {
    console.log('validateEmail request = ', {email: email});
    //이메일 검증 api 전송 후 emailPass 세팅
    const emailVailResponse = await emailConfirm({email: email});
    console.log('validateEmail response = ', emailVailResponse);
    setEmailPass(!emailVailResponse.is_duplicated);
    console.log(emailPass);
    if (!emailVailResponse.is_duplicated)
      Alert.alert('중복확인', '사용 가능한 이메일입니다.', [
        {text: '닫기', style: 'cancel'},
      ]);
    else
      Alert.alert('중복확인', '사용 불가능한 이메일입니다.', [
        {text: '닫기', style: 'cancel'},
      ]);
    return emailPass;
  };

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
          <H3 color={Color.MAINBLACK}>회원 가입</H3>
          <Spacer space={heightPercent(40)} />
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
                width: widthPercent(120),
              }}
            />
            <Typo.DETAIL1 color="#98A2B3">이메일 입력</Typo.DETAIL1>
            <View
              style={{
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: 2,
                width: widthPercent(120),
              }}
            />
          </View>
          <Spacer space={heightPercent(10)} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <SimpleInput
              placeholder={'이메일 입력'}
              value={email}
              onChangeText={email => setEmail(email)}
              backGroundColor={Color.CUTEYELLOW}
              textColor={Color.MAINBLACK}
              editable={!emailPass}
              width={'70%'}
            />
            <BasicButton
              onPress={validateEmail}
              paddingVertical={16}
              disabled={email.length <= 0}
              width={'30%'}
              borderRadius={8}
              backgroundColor={email.length <= 0 ? '#D0D5DD' : MAINYELLOW}
              borderColor={email.length <= 0 ? '#D0D5DD' : MAINYELLOW}>
              <Text
                style={{
                  color: email.length <= 0 ? MAINWHITE : Color.MAINBLACK,
                  fontSize: fontPercent(16),
                  fontFamily: Font.MAINFONT,
                }}>
                중복확인
              </Text>
            </BasicButton>
          </View>
          <Spacer space={heightPercent(20)} />
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
                width: widthPercent(120),
              }}
            />
            <Typo.DETAIL1 color="#98A2B3">비밀번호 입력</Typo.DETAIL1>
            <View
              style={{
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: 2,
                width: widthPercent(120),
              }}
            />
          </View>
          <Spacer space={heightPercent(10)} />
          <PasswordInput
            placeholder="영문, 숫자, 특수문자 포함 8~20자"
            value={password}
            onChangeText={password => setPassword(password)}
            isForNewEnter={true}
            backGroundColor={Color.CUTEYELLOW}
            textColor={Color.MAINBLACK}
          />
          <Spacer space={heightPercent(10)} />
          <PasswordInput
            placeholder="비밀번호 재 입력"
            realPassword={password}
            value={rePassword}
            onChangeText={rePassword => setRePassword(rePassword)}
            isForReEnter={true}
            backGroundColor={Color.CUTEYELLOW}
            textColor={Color.MAINBLACK}
          />
          <Spacer space={heightPercent(20)} />
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
                width: widthPercent(120),
              }}
            />
            <Typo.DETAIL1 color="#98A2B3">이름 입력</Typo.DETAIL1>
            <View
              style={{
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: 2,
                width: widthPercent(120),
              }}
            />
          </View>
          <Spacer space={heightPercent(10)} />
          <SimpleInput
            placeholder="이름 입력"
            value={userName}
            backGroundColor={Color.CUTEYELLOW}
            textColor={Color.MAINBLACK}
            onChangeText={userName => setUserName(userName)}
          />
          <Spacer space={heightPercent(20)} />
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
                width: widthPercent(120),
              }}
            />
            <Typo.DETAIL1 color="#98A2B3">생년월일 입력</Typo.DETAIL1>
            <View
              style={{
                borderBottomColor: '#D0D5DD',
                borderBottomWidth: 2,
                width: widthPercent(120),
              }}
            />
          </View>
          <Spacer space={heightPercent(10)} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <SimpleInput
              placeholder={'생년월일 입력'}
              value={korDateFormat(birthDate)}
              editable={false}
              onChangeText={birthDate => setBirthDate(birthDate)}
              backGroundColor={Color.CUTEYELLOW}
              textColor={Color.MAINBLACK}
              width={'70%'}
            />
            <YellowButton
              onPress={() => setDateModalOpen(!dateModalOpen)}
              btnText={'생년월일 선택'}
              width={'30%'}
              paddingVertical={16}
              textSize={16}
            />
          </View>
          <Spacer space={heightPercent(20)} />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <WhiteButton
              onPress={toggleCancelModal}
              btnText={'취소'}
              width={'50%'}
              textSize={16}
            />
            <BasicButton
              onPress={connect}
              disabled={abledButton ? false : true}
              borderRadius={8}
              width={'50%'}
              backgroundColor={abledButton ? MAINYELLOW : '#D0D5DD'}
              borderColor={abledButton ? MAINYELLOW : '#D0D5DD'}>
              <Text
                style={{
                  color: abledButton ? Color.MAINBLACK : MAINWHITE,
                  fontSize: fontPercent(16),
                  fontFamily: Font.MAINFONT,
                }}>
                체인 지갑 연결하기
              </Text>
            </BasicButton>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* X 버튼 모달 */}
      <PopUpModal
        isVisible={cancelModalVisible}
        backGroundColor={MAINWHITE}
        setIsVisible={setCancelModalVisible}>
        <View style={{padding: widthPercent(4)}}>
          <Typo.DETAIL1 color={MAINBLACK}>
            회원 가입을 그만 하시겠어요?
          </Typo.DETAIL1>
          <Spacer space={heightPercent(8)} />
          <Typo.DETAIL2 color={MAINGRAY}>
            회원 가입 후 암표 없는 티켓팅 서비스를 사용해보세요!
          </Typo.DETAIL2>
          <Spacer space={heightPercent(20)} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <BasicButton
              onPress={() => navigation.navigate('LoginScreen')}
              width="50%"
              borderRadius={8}
              backgroundColor={MAINWHITE}
              borderColor={MAINYELLOW}>
              <Typo.DETAIL2 color={MAINBLACK}>그만하기</Typo.DETAIL2>
            </BasicButton>
            <YellowButton
              onPress={toggleCancelModal}
              isRadius={false}
              btnText={'계속하기'}
              width="50%"
            />
          </View>
        </View>
      </PopUpModal>

      <DatePicker
        mode="date"
        locale="ko-KR"
        modal
        open={dateModalOpen}
        date={birthDate}
        onConfirm={birthDate => {
          setDateModalOpen(false);
          setBirthDate(birthDate);
        }}
        onCancel={() => {
          setDateModalOpen(false);
        }}
      />
    </SafeAreaView>
  );
};

export default JoinScreen;
