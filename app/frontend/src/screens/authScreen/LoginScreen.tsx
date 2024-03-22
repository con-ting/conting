import {useState, useEffect} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRecoilState} from 'recoil';
import {goMainPageState} from '../../utils/recoil/Atoms';
import * as Color from '../../config/Color';
import * as Font from '../../config/Font';

import {PasswordInput, SimpleInput} from '../../components/input/input.tsx';
import {heightPercent, widthPercent} from '../../config/Dimensions.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import {YellowButton} from '../../components/button/Button.tsx';
import * as Typo from '../../config/Typography.tsx';
import {LocalImageLoader} from '../../utils/common/ImageLoader.tsx';
import * as Animatable from 'react-native-animatable';

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
          <YellowButton
            onPress={() => {
              setGoMainPage(true);
            }}
            btnText={'로그인'}
          />
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
