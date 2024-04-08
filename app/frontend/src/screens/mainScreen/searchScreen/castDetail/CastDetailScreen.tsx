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
import {
  CastDetailSearchApi,
  ConcertSearchApi,
} from '../../../../api/catalog/concert';
import {
  eventFindBySingerAddress,
  eventListFindAll,
  eventListFindByWallet,
} from '../../../../api/web3/event.ts';
import {useAnchorWallet} from '../../../../config/web3Config.tsx';
import {PublicKey} from '@solana/web3.js';
import {makeMyEventData} from '../../../lotteryResultScreen/ResultMainScreen.tsx';
import {useConnection} from '../../../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../../../utils/recoil/Atoms.ts';
import {makeEventData} from '../../MainScreen.tsx';
import {ifError} from 'assert';

const Tabs = ['활동', '이벤트'];

export default function CastDetailScreen({route}: any) {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]); // 선택된 탭 상태
  const {castId} = route.params; // 네비게이션 파라미터에서 castId를 추출
  const [castInfo, setCastInfo] = useState([]); //가수 프로필  정보
  const [castAlbum, setCastAlbum] = useState([]); //가수 앨범 정보
  const [singer, setSinger] = useState([]); //가
  const [castName, setCastName] = useState('');
  const [concerts, setConcerts] = useState([]); // 공연 데이터 상태
  const [events, setEvents] = useState([]); // 이벤트 데이터 상태
  const {connection} = useConnection();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    fetchCast(castId);
  }, [castId]);

  const fetchCast = async (id: number) => {
    console.log('fetchCastRequest =', {
      singer_id: id,
    });

    const response = await CastDetailSearchApi(id);
    console.log('fetchCastResponse =', response);
    setCastInfo(response.singer);
    setCastName(response.singer.name);
    await fetchConcerts(response.singer.name);
    await settingEvent(response.singer.wallet);
    console.log('이름은-----------------', castName);
    console.log('캐스트정보', castInfo);
    // 가수 명 세팅 후 그에 해당하는 콘서트 조회
    setCastAlbum(response.albums);
  };
  const fetchEvents = async (wallet: string) => {
    const resultEvent = [];
    //이벤트 내역 조회
    const eventList = await eventFindBySingerAddress({
      connection: connection,
      anchorWallet: useAnchorWallet,
      singerAddress: new PublicKey(wallet),
    });

    for (const eventListElement of eventList) {
      resultEvent.push(makeEventData({web3Data: eventListElement}));
    }

    return resultEvent;
  };
  const settingEvent = async (wallet: string) => {
    const data = await fetchEvents(wallet);
    setEvents(data);
  };
  // useEffect(() => {
  //   console.log('selectedTab', selectedTab);
  //   settingEvent();
  // }, [selectedTab]);

  const fetchConcerts = async (name: string) => {
    console.log('fetchConcertsRequest=', {
      status: '', // 상태 (예: '예매중')
      region: '', // 지역
      sort: '', // 정렬 기준
      keyword: name, // 조회할 출연진 명
      searchType: '가수', // 검색 타입
      reservation_type: '', // 예매 방식
    });

    const response = await ConcertSearchApi({
      status: '', // 상태 (예: '예매중')
      region: '', // 지역
      sort: '', // 정렬 기준
      keyword: name, // 검색 쿼리
      searchType: '가수', // 검색 타입
      reservation_type: '', // 예매 방식
    });
    console.log('fetchConcertsResponse=', response);
    setConcerts(response.shows);
  };

  // 주어진 castId와 일치하는 출연진 찾기
  // const cast = casts.find(cast => cast.id === castId);

  const renderTabs = () => {
    switch (selectedTab) {
      case '활동':
        return <CastActivityScreen albums={castAlbum} concerts={concerts} />;
      case '이벤트':
        return <CastEventScreen events={events} />;
      default:
        return null;
    }
  };

  // 출연진 정보를 가져와 보내줌
  return (
    <ScrollView style={styles.container}>
      <View style={styles.context}>
        <CastInfo
          name={castInfo.name}
          img={castInfo.instagram}
          instagram={castInfo.profile}
        />
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
