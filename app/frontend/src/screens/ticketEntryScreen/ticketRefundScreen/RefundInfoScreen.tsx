import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import RefundInfo from '../../../components/infos/RefundInfo';
import {useEffect} from 'react';

export default function RefundInfoScreen({route}) {
  useEffect(() => {
    console.log('환불내역 페이지', route);
  });

  return (
    <ScrollView style={styles.container}>
      <RefundInfo refund={route.params} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
