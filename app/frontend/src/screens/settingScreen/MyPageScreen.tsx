import React from 'react';
import {View, Text} from 'react-native';

export class MyPageScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>마이 페이지</Text>
      </View>
    );
  }
}
