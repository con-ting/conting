import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {F_SIZE_Y_BUTTON} from '../../config/Font';

export default function SeatAreaButtons() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={F_SIZE_Y_BUTTON}>A구역</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={F_SIZE_Y_BUTTON}>B구역</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={F_SIZE_Y_BUTTON}>C구역</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
  },
});
