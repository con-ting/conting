import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions.tsx';
import {AuthHeader} from '../../components/header/AuthHeader.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Typo from '../../config/Typography.tsx';
import {H4} from '../../config/Typography.tsx';
import * as ICON from 'iconsax-react-native';
import {
  CUTEYELLOW,
  MAINBLACK,
  MAINGRAY,
  MAINWHITE,
  MAINYELLOW,
} from '../../config/Color.ts';
import {
  CertNumberInput,
  PhoneNumberInput,
} from '../../components/input/input.tsx';
import {BasicButton, YellowButton} from '../../components/button/Button.tsx';
import * as Color from '../../config/Color.ts';
import * as Font from '../../config/Font.ts';
import {PopUpModal} from '../../components/modal/Modal.tsx';
import {useRecoilState} from 'recoil';
import {fcmToken} from '../../utils/recoil/Atoms.ts';
import {
  certCodeConfirmCodeApi,
  phoneNumberCertMessageSenderApi,
} from '../../api/auth/auth.ts';

type RootStackParamList = {
  PhoneAuthScreen: undefined;
  LoginScreen: undefined;
  JoinScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const PhoneAuthScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [certNumber, setCertNumber] = useState('');
  const [certPass, setCertPass] = useState(false);
  const [token, setToken] = useRecoilState(fcmToken);

  const startCertTimer = () => {
    console.log(phoneNumber);
    //인증번호 발송 api
    phoneNumberCertMessageSenderApi;

    setIsStart(true);
  };

  // 모달 관련
  const [cancelModalVisible, setCancelModalVisible] = useState(false); // < 버튼 눌렀을 때 모달
  const [helpModalVisible, setHelpModalVisible] = useState(false); // '인증번호가 오지 않아요' 눌렀을 때 모달

  const toggleCancelModal = () => {
    setCancelModalVisible(!cancelModalVisible);
  };

  const toggleHelpModal = () => {
    setHelpModalVisible(!helpModalVisible);
  };

  useEffect(() => {
    // 인증번호가 6자리 이상일 때 API 호출 로직을 실행
    if (certNumber.length >= 6) {
      const timer = setTimeout(() => {
        // API 호출 함수
        const response = certCodeConfirmCodeApi({
          random_number: certNumber,
          fcm: token,
        });
        //api 요청 후 값 세팅
        setCertPass(response.result);
      }, 1000); // 1초 후 실행
      // Cleanup function을 통해 컴포넌트가 언마운트되거나 인증번호가 변경되어 다시 useEffect가 호출될 때
      // 이전에 설정된 타이머를 제거함으로써 메모리 누수를 방지
      return () => clearTimeout(timer);
    }
  }, [certNumber]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: widthPercent(10),
        backgroundColor: Color.CUTEYELLOW,
      }}>
      <AuthHeader
        text="핸드폰 인증"
        borderLevel={5}
        leftIcon={<ICON.ArrowLeft2 size={22} color={MAINBLACK} />}
        fontColor={MAINBLACK}
        onLeftPress={toggleCancelModal}
      />
      <Spacer space={heightPercent(45)} />
      <KeyboardAwareScrollView>
        <H4 color={MAINBLACK}>핸드폰 번호를 알려주세요</H4>
        <Spacer space={heightPercent(10)} />
        <Typo.DETAIL1 color={'#98A2B3'}>
          입력하신 번호로 인증번호가 전송됩니다.
        </Typo.DETAIL1>
        <Spacer space={heightPercent(20)} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <PhoneNumberInput
            placeholder="번호 입력"
            width="70%"
            value={phoneNumber}
            editable={!certPass}
            backGroundColor={Color.CUTEYELLOW}
            textColor={Color.MAINBLACK}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          />
          <BasicButton
            onPress={startCertTimer}
            paddingVertical={16}
            disabled={phoneNumber ? false : true}
            width={'30%'}
            borderRadius={8}
            backgroundColor={phoneNumber ? MAINYELLOW : '#D0D5DD'}
            borderColor={phoneNumber ? MAINYELLOW : '#D0D5DD'}>
            <Text
              style={{
                color: phoneNumber ? Color.MAINBLACK : MAINWHITE,
                fontSize: fontPercent(16),
                fontFamily: Font.MAINFONT,
              }}>
              {isStart ? '다시 요청' : '인증 요청'}
            </Text>
          </BasicButton>
        </View>
        <Spacer space={heightPercent(10)} />
        {isStart && (
          <View>
            <CertNumberInput
              placeholder="인증번호"
              value={certNumber}
              onChangeText={certNumber => setCertNumber(certNumber)}
              backGroundColor={CUTEYELLOW}
              editable={!certPass}
              isSameCertNumber={certPass}
              textColor={MAINBLACK}
              isStart={isStart}
            />
            <Spacer space={heightPercent(20)} />
            <TouchableOpacity
              onPress={toggleHelpModal}
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Typo.DETAIL2 color={'#98A2B3'}>
                인증번호가 오지 않아요.
              </Typo.DETAIL2>
            </TouchableOpacity>
          </View>
        )}
        <Spacer space={heightPercent(30)} />
        <BasicButton
          onPress={() => navigation.navigate('JoinScreen', phoneNumber)}
          disabled={certPass ? false : true}
          borderRadius={8}
          backgroundColor={certPass ? MAINYELLOW : '#D0D5DD'}
          borderColor={certPass ? MAINYELLOW : '#D0D5DD'}>
          <Text
            style={{
              color: certPass ? Color.MAINBLACK : MAINWHITE,
              fontSize: fontPercent(16),
              fontFamily: Font.MAINFONT,
            }}>
            가입하기
          </Text>
        </BasicButton>
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

      {/* 인증번호 안올 때 모달 */}
      <PopUpModal
        isVisible={helpModalVisible}
        backGroundColor={MAINWHITE}
        setIsVisible={setHelpModalVisible}>
        <TouchableOpacity
          onPress={toggleHelpModal}
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <ICON.CloseSquare size={20} color={MAINGRAY} />
        </TouchableOpacity>
        <View style={{padding: widthPercent(4)}}>
          <Spacer space={16} />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Typo.DETAIL1 color={MAINYELLOW}>
              인증번호가 안 온다면 확인해주세요
            </Typo.DETAIL1>
          </View>
          <Spacer space={20} />
          <Typo.DETAIL2 color={'#667085'}>
            1. 핸드폰 스팸 메일함 확인
          </Typo.DETAIL2>
          <Spacer space={10} />
          <Typo.DETAIL2 color={'#667085'}>
            2. 국제전화(070 시작) 번호가
          </Typo.DETAIL2>
          <Typo.DETAIL2 color={'#667085'}>
            　 차단되어 있는지 확인해 주세요
          </Typo.DETAIL2>
        </View>
      </PopUpModal>
    </SafeAreaView>
  );
};

export default PhoneAuthScreen;
