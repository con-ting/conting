import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import RefundInfo from '../../../components/infos/RefundInfo';

export default function RefundInfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <RefundInfo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
