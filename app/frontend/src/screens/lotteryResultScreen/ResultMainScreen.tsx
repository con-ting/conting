import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CARDBASE, MAINBLACK} from '../../config/Color.ts';
import {F_SIZE_TITLE} from '../../config/Font.ts';
import {widthPercent} from '../../config/Dimensions.tsx';
import ReservationWaitingScreen from './ReservationWaitingScreen.tsx';
import EventApplicationScreen from './EventApplicationScreen.tsx';

const Tabs = ['결제 내역', '이벤트 내역'];

export type consertCardData = {
  ticket_id: number;
  order_id: number;
  schedule_id: string;
  performance_id: number; //local DB
  img: string; //local DB
  title: string; // local DB
  hall_location: string; //local DB
  hall_name: string; //local DB
  time: string;
  running_time: string;
  tag_type: string; // '예매완료, 환불대기, 결제대기, 기한경과', 예매 실패
};
export type orderResultApiListData = {
  ticket_id: number; //'티켓 이슈 ID';
  order_id: number; //'주문 내역 id';
  schedule_id: string; //'회차 ID';
  status: string; //'예매완료, 환불대기, 결제대기, 기한경과';
  pay_due_date: string; //'결제기한';
};
export type localListData = {
  schedule_id: number; // 이놈으로 조회해야함 이 데이터들을
  performance_id: number; //local DB
  img: string; //local DB
  title: string; // local DB
  hall_location: string; //local DB
  hall_name: string; //local DB
  reservation_start_datetime: string; //local DB
  reservation_end_datetime: string; //local DB
  start_date: string; //local DB
  start_end_date: string; //local DB
  start_time: string;
  end_time: string;
};
export default function SearchMainScreen() {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]); // 선택된 탭 상태
  const [cardList, setCardList] = useState([]);

  const getOrderResultList = async () => {
    //결제 내역 리스트 조회

    return [];
  };
  const getEventResultList = async () => {
    //이벤트 내역 조회

    return [];
  };
  // useEffect
  useEffect(() => {
    console.log('내역 페이지 진입 = ', selectedTab);
    if (selectedTab == Tabs[0]) {
      setCardList(getOrderResultList);
    } else {
      setCardList(getEventResultList);
    }
  }, [selectedTab]); // searchQuery 또는 selectedTab이 변경될 때마다 API를 호출

  const renderTabs = () => {
    switch (selectedTab) {
      case Tabs[0]:
        return <ReservationWaitingScreen props={cardList} />;
      case Tabs[1]:
        return <EventApplicationScreen props={cardList} />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.context}>
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
