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
    <KeyboardAwareScrollView
      style={styles.view}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
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
        </View>
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
  view: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  contentContainer: {
    flexGrow: 1, // 스크롤 뷰의 컨텐츠가 충분한 공간을 차지하도록 설정
    justifyContent: 'space-between', // 컨텐츠와 하단 버튼 사이에 공간을 만듦
  },

  container: {
    flex: 1,
    margin: 20,
  },
  context: {
    flex: 1,
    // backgroundColor: 'white',
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
    marginBottom: 20,
    alignItems: 'center',
  },
});
