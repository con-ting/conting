import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {MAINBLACK, MAINWHITE, MAINYELLOW} from '../../config/Color.ts';
import {
  CertNumberInput,
  PhoneNumberInput,
} from '../../components/input/input.tsx';
import {BasicButton, YellowButton} from '../../components/button/Button.tsx';
import * as Color from '../../config/Color.ts';
import * as Font from '../../config/Font.ts';
import {PopUpModal} from '../../components/modal/Modal.tsx';

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
  const realCertNumber = 'aaaaaa';

  const startCertTimer = () => {
    if (phoneNumber) {
      setIsStart(true);
    }
  };

  // 모달 관련
  const [cancelModalVisible, setCancelModalVisible] = useState(false); // x버튼 눌렀을 때 모달
  const [helpModalVisible, setHelpModalVisible] = useState(false); // '인증번호가 오지 않아요' 눌렀을 때 모달

  const toggleCancelModal = () => {
    setCancelModalVisible(!cancelModalVisible);
  };

  const toggleHelpModal = () => {
    setHelpModalVisible(!helpModalVisible);
  };

  return (
    <SafeAreaView
      style={{padding: widthPercent(10), backgroundColor: Color.CUTEYELLOW}}>
      <AuthHeader
        text="핸드폰 인증"
        borderLevel={5}
        leftIcon={<ICON.ArrowLeft2 size={22} color={MAINBLACK} />}
        fontColor={MAINBLACK}
        onRightPress={toggleCancelModal}
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
            backGroundColor={Color.CUTEYELLOW}
            textColor={Color.MAINBLACK}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          />
          <YellowButton
            onPress={startCertTimer}
            paddingVertical={16}
            textSize={16}
            width={'30%'}
            btnText={isStart ? '다시 요청' : '인증 요청'}
          />
        </View>
        <Spacer space={heightPercent(10)} />
        {isStart && (
          <View>
            <CertNumberInput
              placeholder="인증번호"
              value={certNumber}
              onChangeText={certNumber => setCertNumber(certNumber)}
              realCertNumber={realCertNumber}
              isStart={isStart}
            />
            <Spacer space={heightPercent(20)} />
            <TouchableOpacity
              onPress={toggleHelpModal}
              style={{marginHorizontal: widthPercent(100)}}>
              <Typo.DETAIL3 color={'#98A2B3'}>
                인증번호가 오지 않아요.
              </Typo.DETAIL3>
            </TouchableOpacity>
          </View>
        )}
        <Spacer space={heightPercent(30)} />
        <BasicButton
          onPress={() => navigation.navigate('JoinScreen')}
          disabled={certNumber ? false : true}
          backgroundColor={certNumber ? MAINYELLOW : '#D0D5DD'}
          borderColor={certNumber ? MAINYELLOW : '#D0D5DD'}>
          <Text
            style={{
              color: Color.MAINYELLOW,
              fontSize: fontPercent(12),
              fontFamily: Font.MAINFONT,
            }}>
            회원정보 입력하기
          </Text>
        </BasicButton>
      </KeyboardAwareScrollView>

      {/* X 버튼 모달 */}
      <PopUpModal
        isVisible={cancelModalVisible}
        setIsVisible={setCancelModalVisible}>
        <View style={{padding: widthPercent(4)}}>
          <Typo.DETAIL1>비밀번호 찾기를 그만 하시겠어요?</Typo.DETAIL1>
          <Spacer space={heightPercent(8)} />
          <Typo.DETAIL3>
            계정을 찾고 근무 관리를 편리하게 해보세요!
          </Typo.DETAIL3>
          <Spacer space={heightPercent(20)} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <BasicButton
              onPress={() => navigation.navigate('LoginScreen')}
              width="50%"
              backgroundColor={MAINWHITE}
              borderColor={MAINYELLOW}>
              <Typo.DETAIL2 color={MAINBLACK}>그만하기</Typo.DETAIL2>
            </BasicButton>
            <YellowButton
              onPress={toggleCancelModal}
              btnText={'계속하기'}
              width="50%"
            />
          </View>
        </View>
      </PopUpModal>

      {/* 인증번호 안올 때 모달 */}
      <PopUpModal
        isVisible={helpModalVisible}
        setIsVisible={setHelpModalVisible}>
        <TouchableOpacity
          onPress={toggleHelpModal}
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <ICON.Back size={20} />
        </TouchableOpacity>
        <View style={{padding: widthPercent(4)}}>
          <Spacer space={16} />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Typo.DETAIL1>인증번호가 안 온다면 확인해주세요</Typo.DETAIL1>
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
