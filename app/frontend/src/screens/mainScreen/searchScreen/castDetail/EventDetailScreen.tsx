import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_TEXT} from '../../../../config/Font';
import {MAINBLACK} from '../../../../config/Color';

export default function EventDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={F_SIZE_TEXT}>dd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
