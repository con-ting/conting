import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FamilySelectButton from '../../components/button/FamilySelectButton';
import ConcertDateChoiceButton from '../../components/button/ConcertDateChoiceButton';

export class MyPageScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>마이 페이지</Text>
        <FamilySelectButton />
        <ConcertDateChoiceButton />
      </View>
    );
  }
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
