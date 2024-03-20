import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {F_SIZE_BIGTEXT} from '../../../config/Font';
import {MAINBLACK} from '../../../config/Color';
import PayInfo from '../../../components/infos/PayInfo';

export default function PaymentScreen() {
  return (
    <ScrollView style={styles.container}>
      <PayInfo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
