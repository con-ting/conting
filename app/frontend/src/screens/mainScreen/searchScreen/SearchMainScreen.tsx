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

export default function SearchMainScreen() {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]); // 선택된 탭 상태
  const [result, setResult] = useState(null);

  const renderTabs = () => {
    switch (selectedTab) {
      case '공연':
        return <ConcertListScreen />;
      case '출연진':
        return <CastListScreen />;
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
          <SearchBar backGroundColor={CARDBASE} textSize={16} />
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
  search: {
    alignItems: 'center',
  },
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
