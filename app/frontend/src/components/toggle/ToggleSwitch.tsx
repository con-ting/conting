import * as React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {fontPercent} from '../../config/Dimensions';
import {BTNGRAY, MAINGRAY, MAINYELLOW} from '../../config/Color';
import {MAINFONT} from '../../config/Font';

type ToggleSwitchProps = {
  onToggle: () => void;
  isToggled: boolean;
};

/**
 * ToggleSwitch입니다.
 * @param props
 * - onToggle: 클릭 시 발생할 이벤트
 * - isToggled: 토글 스위치의 상태
 * @returns
 * - 토글버튼은 판매중인 응모권 조회 페이지에서 사용되며, NFT 판매 카드와 세트입니다.
 * - 토글버튼을 누를 경우, 보유한 NFT 티켓의 가격 정보가 0,000 sol -> 00,000 원으로 보이도록 합니다.
 * - onValueChange: 스위치의 값이 변경될 때 실행될 콜백 함수, 켜짐/꺼짐이 매개변수로 전달
 * - value: 스위치의 현재 상태, true=켜짐/false=꺼짐
 * - trackColor: 버튼 배경 색상
 * - thumbColor: 버튼 색상
 * @author 전상혁
 */

export default function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>원화로 보기</Text>
      <Switch
        onValueChange={props.onToggle}
        value={props.isToggled}
        trackColor={{false: BTNGRAY, true: MAINGRAY}}
        thumbColor={MAINYELLOW}
        style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginRight: 10,
    fontSize: fontPercent(12),
    color: MAINYELLOW,
    fontFamily: MAINFONT,
  },
});
