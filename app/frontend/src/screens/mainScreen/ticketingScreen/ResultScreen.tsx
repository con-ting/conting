import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_TITLE} from '../../../config/Font';
import {MAINBLACK} from '../../../config/Color';
import {YellowButton} from '../../../components/button/Button';
import {heightPercent, widthPercent} from '../../../config/Dimensions';

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <View />

      <View style={styles.button}>
        <Text style={F_SIZE_TITLE}>예매 성공!</Text>
      </View>
      <View style={styles.button}>
        <YellowButton
          width={'90%'}
          btnText="내 티켓 보러가기"
          textSize={20}
          isRadius
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
