import {StyleSheet, Text, View} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';

export default function CastListScreen() {
  return (
    <View style={styles.container}>
      <Text style={F_SIZE_TITLE}>ddzzz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
