import {Alert, View} from 'react-native';
import {DETAIL1, H3, H4} from '../../config/Typography.tsx';
import {PasswordInput, SimpleInput} from '../../components/input/input.tsx';
import {useState} from 'react';
import * as Color from '../../config/Color.ts';
import {heightPercent, widthPercent} from '../../config/Dimensions.tsx';
import {WhiteButton, YellowButton} from '../../components/button/Button.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import * as Typo from '../../config/Typography.tsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
const JoinScreen = () => {
  const [email, setEmail] = useState('');
  const [emailPass, setEmailPass] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [rePassword, setRePassword] = useState('');

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
              onPress={() => Alert.alert('로그인페이지로')}
              btnText={'취소'}
              width={'50%'}
              textSize={16}
            />
            <YellowButton
              onPress={() => Alert.alert('로그인페이지로')}
              btnText={'가입하기'}
              width={'50%'}
              textSize={16}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default JoinScreen;
