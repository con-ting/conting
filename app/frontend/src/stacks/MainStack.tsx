import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WaitingScreen from '../screens/mainScreen/ticketingScreen/WaitingScreen';
import SeatingAreaSelectScreen from '../screens/mainScreen/ticketingScreen/SeatingAreaSelectScreen';
import PaymentScreen from '../screens/mainScreen/ticketingScreen/PaymentScreen';
import ResultScreen from '../screens/mainScreen/ticketingScreen/ResultScreen';
import RefundInfoScreen from '../screens/ticketEntryScreen/ticketRefundScreen/RefundInfoScreen';
import ResultRefundScreen from '../screens/mainScreen/ticketingScreen/ResultRefundScreen';
import BottomTabNavigator from './../navigation/BottomTabNavigator';
import {heightPercent} from '../config/Dimensions';
import {MAINFONT} from '../config/Font';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ConcertDetailScreen from '../screens/mainScreen/ConcertDetailScreen';
import ConcertRegistScreen from '../screens/settingScreen/concertRegistScreen/ConcertRegistScreen';
import ConcertRegistInfoScreen from '../screens/settingScreen/concertRegistScreen/ConcertRegistInfoScreen';
import ConcertRegistHallScreen from '../screens/settingScreen/concertRegistScreen/ConcertRegistHallScreen';
import ConcertRegistCastScreen from '../screens/settingScreen/concertRegistScreen/ConcertRegistCastScreen';
import ConcertRegistCompany from '../screens/settingScreen/concertRegistScreen/ConcertRegistCompany';
import SearchMainScreen from '../screens/mainScreen/searchScreen/SearchMainScreen';
import CastDetailScreen from '../screens/mainScreen/searchScreen/castDetail/CastDetailScreen';
import EventDetailScreen from '../screens/mainScreen/searchScreen/castDetail/EventDetailScreen';
import TicketCheckScreen from '../screens/settingScreen/ticketCheckScreen/TicketCheckListScreen';
import CameraScreen from '../screens/settingScreen/ticketCheckScreen/CameraScreen';
import HallViewScreen from '../screens/mainScreen/hallViewScreen/HallViewScreen';
import ResultMainScreen from '../screens/lotteryResultScreen/ResultMainScreen';
import NftShopMainScreen from '../screens/ticketApplyScreen/nftShopScreen/NftShopMainScreen.tsx';

const Stack = createNativeStackNavigator();
// 키워드 인자를 사용할 경우 인자 타입 받는 부분 변경해야함. 현재 X
// header style을 위한 변수
const options = (headerShown: boolean, title: string, color = 'black') => {
  return {
    headerShown: headerShown,
    title: title,
    headerStyle: {
      backgroundColor: color,
      borderBottomColor: 'transparent', //헤더 테두리 색 제거
      elevation: 0, //Android에서 헤더 그림자 제거
      height: heightPercent(60),
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily: MAINFONT,
    },
    // options에서 타입 호환성 문제 발생하여 명시적으로 타입 지정
    headerTitleAlign: 'center' as 'center',
    // 개별 스크린에 이펙트 적용 (현재 대기열 진입시 오른쪽에서 왼쪽으로 페이지 전환)
    animation: 'slide_from_right',
  };
};

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Waiting"
        component={WaitingScreen}
        options={options(true, '대기열')}
      />
      <Stack.Screen
        name="SeatArea"
        component={SeatingAreaSelectScreen}
        options={options(true, '구역 선택')}
      />
      <Stack.Screen
        name="Pay"
        component={PaymentScreen}
        options={options(true, '결제하기')}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Refund"
        component={RefundInfoScreen}
        options={options(true, '구매 내역')}
      />
      <Stack.Screen
        name="ResultRefund"
        component={ResultRefundScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'NftShopMainScreen'}
        component={NftShopMainScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ConcertDetail"
        component={ConcertDetailScreen}
        options={options(false, '공연 상세')}
      />
      <Stack.Screen
        name="hallDetail"
        component={HallViewScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="ConcertRegist"
        component={ConcertRegistScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="ConcertRegistInfo"
        component={ConcertRegistInfoScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="ConcertRegistHall"
        component={ConcertRegistHallScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="ConcertRegistCast"
        component={ConcertRegistCastScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="ConcertRegistCompany"
        component={ConcertRegistCompany}
        options={options(true, '')}
      />
      <Stack.Screen
        name="SearchMain"
        component={SearchMainScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="CastDetail"
        component={CastDetailScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="TicketCheck"
        component={TicketCheckScreen}
        options={options(true, '검표 가능 목록')}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={options(true, '')}
      />
    </Stack.Navigator>
  );
}

export default gestureHandlerRootHOC(MainStack);
