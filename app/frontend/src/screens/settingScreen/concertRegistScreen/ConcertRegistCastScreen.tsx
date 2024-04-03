import {StyleSheet, Text, View} from 'react-native';
import {CARDBASE, MAINBLACK, MAINWHITE} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import {SearchBar} from '../../../components/searchBar/SearchBar';
import CastList from '../../../components/list/CastList';
import {useNavigation} from '@react-navigation/native';
import {YellowButton} from '../../../components/button/Button';
import {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CastSearchApi} from '../../../api/catalog/concert';

export default function ConcertRegistCastScreen({route}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [casts, setCasts] = useState([]);
  const [selectedCastId, setSelectedCastId] = useState(null);

  const handleCastSelect = cast => {
    setSelectedCastId(cast.singer_id);
  };

  useEffect(() => {
    if (casts.length === 0) {
      fetchCasts();
    }
  });

  const fetchCasts = async () => {
    console.log('출연진 조회');
    const response = await CastSearchApi();
    console.log('fetchCastResponse=', response);
    setCasts(response.singers);
  };

  // 검색 쿼리에 따라 출연진 필터링
  const filteredCast = casts.filter(member =>
    member.singer_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 다음 버튼 이벤트 핸들러 수정
  const handleNext = () => {
    // 이전 단계에서 받은 데이터
    const previousData = route.params.registrationData;

    // 데이터 객체 구성
    const registrationData = {
      ...previousData,
      singer_id: selectedCastId, // 선택된 출연진 singer_id 추가
    };

    // 다음 페이지로 데이터 넘기기
    console.log(registrationData);
    navigation.navigate('ConcertRegistCompany', {registrationData});
  };

  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.context}>
          <SearchBar
            backGroundColor={CARDBASE}
            textSize={16}
            value={searchQuery}
            onSearch={setSearchQuery}
          />
          <CastList
            casts={filteredCast}
            isSearch={false}
            onCastSelect={handleCastSelect}
          />
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={handleNext}
            btnText="다음"
            textSize={20}
            width={'30%'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },

  container: {
    flex: 1,
    margin: 20,
  },
  context: {
    flex: 1,
  },
  nextButton: {
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 20,
    marginBottom: 20,
  },
});
