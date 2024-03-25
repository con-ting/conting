import {StyleSheet, Text, View} from 'react-native';
import {MAINBLACK, MAINWHITE} from '../../../config/Color';
import {heightPercent, widthPercent} from '../../../config/Dimensions';
import {DollarCircle, Map1} from 'iconsax-react-native';
import {F_SIZE_TITLE} from '../../../config/Font';
import ConcertHallList from '../../../components/list/ConcertHallList';
import ConcertRegistInputList from '../../../components/list/ConcertRegistInputList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {YellowButton} from '../../../components/button/Button';
import {useNavigation} from '@react-navigation/native';

export default function ConcertRegistHallScreen() {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.context}>
        <View style={styles.title}>
          <Map1 style={styles.icon} />
          <Text style={F_SIZE_TITLE}>공연 장소 </Text>
        </View>
        <View style={styles.center}>
          <ConcertHallList />
        </View>
        <View style={styles.title}>
          <DollarCircle style={styles.icon} />
          <Text style={F_SIZE_TITLE}>구역별 좌석 금액 지정 </Text>
        </View>
        <ConcertRegistInputList />
        <View style={styles.nextButton}>
          <YellowButton
            onPress={() => navigation.navigate('ConcertRegistCast')}
            width={'30%'}
            btnText="다음"
            textSize={20}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  context: {
    margin: 20,
  },
  title: {
    gap: 16,
    flexDirection: 'row',
    marginTop: 10,
  },
  infos: {
    marginLeft: 10,
    marginTop: 14,
    // flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    margin: 15,
  },

  icon: {
    width: widthPercent(32),
    height: heightPercent(32),
    color: MAINWHITE,
  },
  nextButton: {
    alignItems: 'center',
  },
});
