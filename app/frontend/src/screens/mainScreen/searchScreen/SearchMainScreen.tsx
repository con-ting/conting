import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {F_SIZE_TITLE} from '../../../config/Font';
import {CARDBASE, MAINBLACK, MAINYELLOW} from '../../../config/Color';
import {SearchBar} from '../../../components/searchBar/SearchBar';
import {widthPercent} from '../../../config/Dimensions';
import ConcertListScreen from './ConcertListScreen';
import CastListScreen from './CastListScreen';
import ConcertHallScreen from './ConcertHallScreen';
import casts from '../../../components/data/casts';
import {ConcertSearchApi} from '../../../api/catalog/concert';

const Tabs = ['공연', '출연진', '공연장'];

export default function SearchMainScreen() {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]); // 선택된 탭 상태
  const [result, setResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [concerts, setConcerts] = useState([]); // 공연 데이터

  // 검색 쿼리 변경 시 호출되는 useEffect
  useEffect(() => {
    console.log('검색 페이지 진입');
    const fetchConcerts = async () => {
      console.log('fetchConcertsRequest=', {
        status: '', // 상태 (예: '예매중')
        region: '', // 지역
        sort: 'date', // 정렬 기준
        keyword: searchQuery, // 검색 쿼리
        searchType: '', // 검색 타입
        reservation_type: '', // 예매 방식
      });

      // 검색 조건에 따른 API 호출 (여기서는 예시로 몇 가지 조건만 설정)
      const response = await ConcertSearchApi({
        status: '', // 상태 (예: '예매중')
        region: '', // 지역
        sort: '', // 정렬 기준
        keyword: searchQuery, // 검색 쿼리
        searchType: '', // 검색 타입
        reservation_type: '', // 예매 방식
      });
      console.log('fetchConcertsResponse=', response);
      setConcerts(response.shows); // 응답 데이터로 공연 데이터 상태 업데이트
    };

    fetchConcerts(); // API 호출
  }, [searchQuery]); // searchQuery가 변경될 때마다 API를 호출

  // 검색 쿼리에 따라 출연진 필터링
  const filteredCast = casts.filter(cast =>
    cast.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderTabs = () => {
    switch (selectedTab) {
      case '공연':
        return <ConcertListScreen concerts={concerts} />;
      case '출연진':
        return <CastListScreen casts={filteredCast} />;
      case '공연장':
        return <ConcertHallScreen />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.context}>
        <View style={styles.search}>
          <SearchBar
            backGroundColor={CARDBASE}
            textSize={16}
            value={searchQuery}
            onSearch={setSearchQuery}
          />
        </View>
        <View style={styles.tabsContainer}>
          {Tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                selectedTab === tab && styles.tabItemSelected,
              ]}
              onPress={() => setSelectedTab(tab)}>
              <Text style={F_SIZE_TITLE}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderTabs()}
      </View>
    </ScrollView>
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
  resultItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultDescription: {
    fontSize: 14,
  },
  search: {},
  tabsContainer: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabItem: {
    width: widthPercent(398) / 3,
    padding: 10,
    alignItems: 'center',
    // borderBottomColor: 'grey', // 경계선 색상
    borderBottomWidth: 3, // 전체 탭의 하단 경계선
  },

  tabItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCC434', // 선택된 탭 하이라이트
  },
});
