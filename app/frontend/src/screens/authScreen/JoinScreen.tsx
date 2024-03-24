import {Alert, View} from 'react-native';
import {H3} from '../../config/Typography.tsx';
import {PasswordInput, SimpleInput} from '../../components/input/input.tsx';
import React, {useState} from 'react';
import * as Color from '../../config/Color.ts';
import {heightPercent, widthPercent} from '../../config/Dimensions.tsx';
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
import * as Linking from 'expo-linking';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

type RootStackParamList = {
  PhoneAuthScreen: undefined;
  LoginScreen: undefined;
  JoinScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const JoinScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [emailPass, setEmailPass] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [cancelModalVisible, setCancelModalVisible] = useState(false); // < 버튼 눌렀을 때 모달

  const toggleCancelModal = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  // DApp 키 쌍과 Phantom 지갑 공개키를 저장하기 위한 상태
  const [dappKeyPair] = useState(() => nacl.box.keyPair());
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState(null);
  // Phantom 지갑 연결 함수
  const connect = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: 'mainnet-beta',
      app_url: 'https://phantom.app',
      redirect_link: Linking.createURL('/'),
    });

    const url = `https://phantom.app/ul/v1/connect?${params.toString()}`;
    Linking.openURL(url);
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
              onPress={() => setEmailPass(!emailPass)}
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
            }}>
            <WhiteButton
              onPress={toggleCancelModal}
              btnText={'취소'}
              width={'50%'}
              textSize={16}
            />
            <YellowButton
              onPress={connect}
              btnText={'체인 지갑 연결하기'}
              width={'50%'}
              textSize={16}
            />
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
    </SafeAreaView>
  );
};

export default JoinScreen;
