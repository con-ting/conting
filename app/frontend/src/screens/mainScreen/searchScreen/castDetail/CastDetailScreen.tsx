import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MAINBLACK} from '../../../../config/Color';
import {F_SIZE_TITLE} from '../../../../config/Font';
import {useEffect, useState} from 'react';
import SingerProfile from '../../../../components/card/SingerProfile';
import casts from '../../../../components/data/casts';
import CastInfo from '../../../../components/infos/CastInfo';
import CastActivityScreen from './CastActivityScreen';
import CastEventScreen from './CastEventScreen';
import {widthPercent} from '../../../../config/Dimensions';

const Tabs = ['활동', '이벤트'];

export default function CastDetailScreen({route}: any) {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]); // 선택된 탭 상태
  const {castId} = route.params; // 네비게이션 파라미터에서 castId를 추출

  // 주어진 castId와 일치하는 출연진 찾기
  const cast = casts.find(cast => cast.id === castId);

  const renderTabs = () => {
    switch (selectedTab) {
      case '활동':
        return <CastActivityScreen />;
      case '이벤트':
        return <CastEventScreen />;
      default:
        return null;
    }
  };

  // 출연진 정보를 가져와 보내줌
  return (
    <ScrollView style={styles.container}>
      <View style={styles.context}>
        {cast && <CastInfo name={cast.name} img={cast.image} />}
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

  tabsContainer: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabItem: {
    width: widthPercent(375) / 2,
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
