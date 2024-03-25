import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {F_SIZE_TITLE} from '../../../config/Font';
import {MAINBLACK} from '../../../config/Color';

export default function ConcertRegistCompany() {
  return (
    <View style={styles.container}>
      <Text style={F_SIZE_TITLE}> gd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
