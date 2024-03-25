import {Alert, Text, View} from 'react-native';
import {H3} from '../../config/Typography.tsx';
import {PasswordInput, SimpleInput} from '../../components/input/input.tsx';
import React, {useState} from 'react';
import * as Color from '../../config/Color.ts';
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
import {PopUpModal} from '../../components/modal/Modal.tsx';
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
import {fcmToken} from '../../utils/recoil/Atoms.ts';
import {korDateFormat} from '../../config/TimeFormat.ts';
import DatePicker from 'react-native-date-picker';
import * as Font from '../../config/Font.ts';

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
  const [birthDate, setBirthDate] = useState(new Date());
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false); // < 버튼 눌렀을 때 모달
  const phoneNumber = propsData.route.params.replace(/-/g, '');
  const toggleCancelModal = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  const abledButton = emailPass && password === rePassword && password !== '';

  const connect = () => {
    console.log({
      email: email,
      password: password,
      name: userName,
      phone_number: phoneNumber,
      birth_date: birthDate,
      fcm: token,
      wallet: cryptoAddress,
    });
    //1. 여기부터 팬텀 연결로직 들어가서 주소 가져와야합니다.

    //2. API 전송
    userJoin({
      email: email,
      password: password,
      name: userName,
      phone_number: phoneNumber,
      birth_date: birthDate,
      fcm: token,
      wallet: cryptoAddress,
    });
    //3. 로그인 후 토큰 저장

    //4. goMainPage 수정
  };

  const validateEmail = (): boolean => {
    //이메일 검증 api 전송 후 emailPass 세팅
    setEmailPass(!emailPass);
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
            <YellowButton
              onPress={validateEmail}
              btnText={'중복확인'}
              width={'30%'}
              paddingVertical={16}
              textSize={16}
            />
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
