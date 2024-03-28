import {Refresh} from 'iconsax-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';

type props = {
  onPress: () => void;
};

export default function CreateQR(props: props) {
  return (
    <View style={styles.QRCard}>
      <TouchableOpacity onPress={props.onPress}>
        <Refresh size={widthPercent(150)} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  QRCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
