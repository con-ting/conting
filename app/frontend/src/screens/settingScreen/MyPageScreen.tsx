import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FamilySelectButton from '../../components/button/FamilySelectButton';
import ConcertDateChoiceButton from '../../components/button/ConcertDateChoiceButton';
import ProfileSection from '../../components/profile/ProfileSection';
import MyPageButtons from '../../components/button/MyPageButtons';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../utils/recoil/Atoms.ts';

export default function MyPageScreen() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  return (
    <View style={styles.container}>
      <View style={styles.context}>
        {/* <Text style={styles.text}>마이 페이지</Text> */}
        <ProfileSection
          name={userInfo?.user_email}
          wallet={userInfo?.walletAddress}
        />
        <MyPageButtons />
        {/* <FamilySelectButton /> */}
        {/* <ConcertDateChoiceButton /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // 배경색을 검은색으로 설정
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  context: {
    margin: 20,
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
});
