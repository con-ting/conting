import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NFTTicket from '../../../components/card/NFTTicketInfoCard.tsx';
import {fontPercent} from '../../../config/Dimensions';
import ToggleSwitch from '../../../components/toggle/ToggleSwitch';

//판매중인 응모권 조회 페이지
export default function TicketSaleScreen() {
  // 원화 표시 여부를 관리하기 위한 상태 관리
  const [showInKRW, setShowInKRW] = useState(false);

  // 토글 스위치의 상태를 변경하는 함수
  const toggleSwitch = () => {
    setShowInKRW(!showInKRW);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>판매중인 응모권 조회 페이지</Text>

      {/* ToggleSwitch 컴포넌트에 상태와 핸들러 함수 전달 */}
      <ToggleSwitch isToggled={showInKRW} onToggle={toggleSwitch} />

      {/* showInKRW 상태를 NFTTicket 컴포넌트로 전달 */}
      <NFTTicket
        title="2024 IU HER WORL D TOUR CONCERT gogogogogo"
        money="1,221"
        status={true}
        showInKRW={showInKRW} //원화 표시 여부를 props로 전달
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // 배경색을 검은색으로 설정
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: fontPercent(20),
    fontFamily: 'Jalnan2TTF',
  },
});
