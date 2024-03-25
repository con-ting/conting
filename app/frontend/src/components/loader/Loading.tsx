import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MAINBLACK} from '../../config/Color';
import {F_SIZE_TITLE} from '../../config/Font';

export default function Loading() {
  const {container} = styles;
  return (
    <View style={container}>
      <Text style={F_SIZE_TITLE}>잠시만 기다려주세요...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
