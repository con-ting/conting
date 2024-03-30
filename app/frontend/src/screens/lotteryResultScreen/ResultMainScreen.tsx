import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BLUEBASE,
  CARDBASE,
  MAINBLACK,
  MAINGRAY,
  MAINYELLOW,
  MINTBASE,
  REDBASE,
} from '../../config/Color.ts';
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
  tag_color: string;
  date_tag: string;
  date_tag_color: string;
  swipe_btn_disabled?: boolean;
  btn_onPress?: () => void;
  swipe_btn_onPress?: () => void;
  swipe_btn_text?: string; // 스와이프 버튼에 들어갈 텍스트
  swipe_btn_color?: string; //스와이프 버튼의 백그라운드 색상
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
    // [BLUEBASE (환불 대기), REDBASE (환불하기 swipe btn), MINTBASE (예매 완료), MAINGRAY (기한경과, 예매실패), MAINYELLOW(결제대기)]
    //순번대기 = {img_tag_type: "순번대기", img_tag_color : BLUEBASE, date_tag: "예매종료일",}
    //예매완료 = {img_tag_type: "예매완료", img_tag_color : MINTBASE, date_tag: "관람예정일", swipe_btn_disabled: true, swipe_btn_onPress: ()=>{Alter.alter("앙 환불띠")}, swipe_btn_text: "환불하기", swipe_btn_color: REDBASE}
    //기한경과 = {img_tag_type: "기한경과", img_tag_color : MAINGRAY, date_tag: "결제마감일",}
    //예매실패 = {img_tag_type: "예매실패", img_tag_color : MAINGRAY, date_tag: "예매종료일",}
    //결제대기 = {img_tag_type: "결제대기", img_tag_color : MAINYELLOW, date_tag: "결제마감일", swipe_btn_disabled: true, swipe_btn_onPress: ()=>{Alter.alter("앙 환불띠")}, swipe_btn_text: "결제하기", swipe_btn_color: MAINYELLOW}
    return [
      {
        ticket_id: 1,
        order_id: 1,
        schedule_id: 1,
        performance_id: 1, //local DB
        img: 'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/2024012215414318c825b7-b889-4ffe-affb-e4f05d9b1886.jpg/melon/resize/180x254/strip/true/quality/90/optimize', //local DB
        title: '2024 IU H.E.R. WORLD TOUR CONCERT IN SEOUL', // local DB
        img_tag_type: '결제대기', // '예매완료, 환불대기, 결제대기, 기한경과', 예매 실패
        img_tag_color: MAINYELLOW, //
        hall_location: '광주광역시 서구 내방로 152 (쌍촌동)', //local DB
        hall_name: '5.18기념문화센터', //local DB
        running_time: '180',
        time: new Date(),
        date_tag: '결제마감일',
        btn_onPress: () => {
          Alert.alert('콘서트 상세로 이동');
        },
        swipe_btn_disabled: false,
        swipe_btn_onPress: () => {
          Alert.alert('앙 결제 띠');
        },
        swipe_btn_text: '결제하기', // 스와이프 버튼에 들어갈 텍스트
        swipe_btn_color: MAINYELLOW, //스와이프 버튼의 백그라운드 색상
      },
      {
        ticket_id: 1,
        order_id: 1,
        schedule_id: 1,
        performance_id: 1, //local DB
        img: 'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/02/20240207105504dbc862cf-1e34-4050-9f0b-827a7ebc3a9f.jpg/melon/resize/180x254/strip/true/quality/90/optimize', //local DB
        title: '2024 IVE 2nd FANMEETING 〈MAGAZINE IVE〉', // local DB
        img_tag_type: '예매완료', // '예매완료, 환불대기, 결제대기, 기한경과', 예매 실패
        img_tag_color: MINTBASE, //
        hall_location: '광주광역시 서구 내방로 152 (쌍촌동)', //local DB
        hall_name: '5.18기념문화센터', //local DB
        running_time: '180',
        time: new Date(),
        date_tag: '결제마감일',
        btn_onPress: () => {
          Alert.alert('콘서트 상세로 이동');
        },
        swipe_btn_disabled: true,
        swipe_btn_onPress: 'a',
        swipe_btn_text: '결제하기', // 스와이프 버튼에 들어갈 텍스트
        swipe_btn_color: MAINYELLOW, //스와이프 버튼의 백그라운드 색상
      },
    ];
  };
  const getEventResultList = async () => {
    //이벤트 내역 조회

    return [];
  };
  // useEffect
  useEffect(() => {
    console.log('내역 페이지 진입 = ', selectedTab);
    if (selectedTab == Tabs[0]) {
      // getOrderResultList 함수의 결과를 기다린 후에 처리하도록 수정
      getOrderResultList().then(data => {
        console.log('a =', data);
        setCardList(data);
      });
    } else {
      getEventResultList().then(list => {
        setCardList(list);
      });
    }
  }, [selectedTab]); // searchQuery 또는 selectedTab이 변경될 때마다 API를 호출

  const renderTabs = () => {
    switch (selectedTab) {
      case Tabs[0]:
        return <ReservationWaitingScreen concerts={cardList} />;
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
