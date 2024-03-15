import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ReservationWaitingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>환불대기중 페이지</Text>
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
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
});
