import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {F_SIZE_BIGTEXT} from '../../../config/Font';
import SeatAreaButtons from '../../../components/button/SeatAreaButtons';

export default function SeatingAreaSelectScreen() {
  return (
    <ScrollView style={styles.container}>
      <SeatAreaButtons />
      {/* <Text style={F_SIZE_BIGTEXT}>구역 선택할 페이지입니다</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
