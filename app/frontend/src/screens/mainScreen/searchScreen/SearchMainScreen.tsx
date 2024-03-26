import React, {useState} from 'react';
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

const Tabs = ['공연', '출연진', '공연장'];

const casts = [
  {
    id: '1',
    name: '임영웅',
    image:
      'https://i.namu.wiki/i/7FpxInSbpvgkaU5FWmcDzgHo5xOZ3DPK6-N7TpzMvcDjzUFU_yNzljdsIvZx7mO9-C9NmLomyB1jUWdbXaDgvg.webp',
  },
  {
    id: '2',
    name: '박효신',
    image: 'https://m.segye.com/content/image/2019/06/28/20190628507687.jpg',
  },
  {
    id: '3',
    name: '백예린',
    image:
      'https://img.asiatoday.co.kr/file/2019y/12m/23d/2019122201002305300130491.jpg',
  },
  {
    id: '4',
    name: '성시경',
    image:
      'https://yt3.googleusercontent.com/vQrdlCaT4Tx1axJtSUa1oxp2zlnRxH-oMreTwWqB-2tdNFStIOrWWw-0jwPvVCUEjm_MywltBFY=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: '5',
    name: '에픽하이',
    image:
      'https://www.coloradotimesnews.com/wp-content/uploads/2023/01/20230118_091226-1.jpg',
  },
  {
    id: '6',
    name: '싸이',
    image:
      'https://wimg.mk.co.kr/meet/neds/2021/01/image_readtop_2021_56687_16109677744511536.jpg',
  },
  {
    id: '7',
    name: '아이유',
    image:
      'https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.png',
  },
];

export default function SearchMainScreen() {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]); // 선택된 탭 상태
  const [result, setResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 쿼리에 따라 출연진 필터링
  const filteredCast = casts.filter(cast =>
    cast.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderTabs = () => {
    switch (selectedTab) {
      case '공연':
        return <ConcertListScreen />;
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
