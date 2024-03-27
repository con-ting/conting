import {useState, useEffect, useCallback} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRecoilState} from 'recoil';
import {goMainPageState, userInfoState} from '../../utils/recoil/Atoms';
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
import {useConnection} from '../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {
  useAuthorization,
  Account,
} from '../../components/mobileWalletAdapter/providers/AuthorizationProvider.tsx';
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {alertAndLog} from '../../utils/common/alertAndLog.ts';

type RootStackParamList = {
  LoginScreen: undefined;
  PhoneAuthScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goMainPage, setGoMainPage] = useRecoilState(goMainPageState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const {authorizeSession} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        await authorizeSession(wallet);
      });
    } catch (err: any) {
      alertAndLog(
        '연결 중 에러 발생',
        err instanceof Error ? err.message : err,
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('개인 지갑 주소 =: ' + account.publicKey);
      console.log('개인 지갑 앱 = ' + account.label);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('개인 지갑 잔액 = ' + fetchedBalance);
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

  const loginApi = async () => {
    console.log('loginRequest=', {
      email: email,
      password: password,
    });
    //3. 로그인 후 토큰 저장
    const loginResponse = await login({
      email: email,
      password: password,
    });
    console.log('loginResponse = ', loginResponse.token);
    // 토큰 저장
    await setAsync('accessToken', loginResponse.token.accessToken);
    await setAsync('refreshToken', loginResponse.token.refreshToken);
    //전역 상태에 유저 정보 저장
    setUserInfo({
      user_id: loginResponse.user.id,
      user_email: loginResponse.user.email,
    });
    //4. 커넥션 연결
    console.log('커넥션 연결 시도');
    await handleConnectPress(); // await 추가
    console.log('개인 지갑 잔액 = ' + balance);
    console.log('커넥션 후');
    //5. goMainPage 수정
    setGoMainPage(true);
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
          <YellowButton onPress={loginApi} btnText={'로그인'} />
          <Spacer space={20} />
          {/* 이메일 찾기, 비밀번호 찾기, 회원가입 부분 */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('응 이메일 못찾아');
              }}>
              <Typo.DETAIL2 color={'#98A2B3'}>이메일 찾기</Typo.DETAIL2>
            </TouchableOpacity>
            <Typo.DETAIL2 color={'#98A2B3'}> | </Typo.DETAIL2>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('응 비번도 내꺼야');
              }}>
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
