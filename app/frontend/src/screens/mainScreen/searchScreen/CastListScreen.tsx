import {StyleSheet, Text, View} from 'react-native';
import {CARDBASE, MAINBLACK} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import CastList from '../../../components/list/CastList';
import {useState} from 'react';

export default function CastListScreen({casts}: any) {
  return (
    <View style={styles.container}>
      <CastList casts={casts} isSearch={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: MAINBLACK,
  },
});
