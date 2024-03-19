import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_BIGTEXT} from '../../../config/Font';
import SeatAreaButtons from '../../../components/button/SeatAreaButtons';

export default function SeatingAreaSelectScreen() {
  return (
    <View style={styles.container}>
      <SeatAreaButtons />
      <Text style={F_SIZE_BIGTEXT}>구역 선택할 페이지입니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
});
