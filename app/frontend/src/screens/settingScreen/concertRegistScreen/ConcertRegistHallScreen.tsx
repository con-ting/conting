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
import {useEffect, useState} from 'react';
import {HallSearchApi} from '../../../api/catalog/concert';

export default function ConcertRegistHallScreen({route}) {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [halls, setHalls] = useState([]); // 공연장 데이터 상태
  // 상태 추가
  const [selectedHallId, setSelectedHallId] = useState(null);

  const [gradePrices, setGradePrices] = useState({});

  const handlePricesChange = prices => {
    setGradePrices(prices);
  };

  // 공연장 선택 핸들러
  const handleHallSelect = hall => {
    setSelectedHallId(hall.id); // hall 객체에서 id 추출하여 상태 업데이트
  };

  useEffect(() => {
    fetchHalls(searchQuery);
  }, [searchQuery]);

  const fetchHalls = async (query: string) => {
    console.log('공연장 조회');
    const response = await HallSearchApi({
      keyword: query,
      region: '',
    });
    console.log('fetchHallsResponse=', response);
    setHalls(response.halls);
  };

  // 다음 버튼 이벤트 핸들러 수정
  const handleNext = () => {
    // 이전 단계에서 받은 데이터
    const previousData = route.params.registrationData;

    // 데이터 객체 구성
    const registrationData = {
      ...previousData,
      hall_id: selectedHallId, // 선택된 공연장의 hall_id 추가
      grade_price: gradePrices, // 추가된 구역별 금액 정보
    };

    // 다음 페이지로 데이터 넘기기
    console.log(registrationData);
    navigation.navigate('ConcertRegistCast', {registrationData});
  };

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
            <ConcertHallList halls={halls} onHallSelect={handleHallSelect} />
          </View>
          <View style={styles.title}>
            <DollarCircle style={styles.icon} />
            <Text style={F_SIZE_TITLE}>구역별 좌석 금액 지정 </Text>
          </View>
          <ConcertRegistInputList onPricesChange={handlePricesChange} />
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={handleNext}
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
