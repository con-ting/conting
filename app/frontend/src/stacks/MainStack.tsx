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
import ConcertRegistScreen from '../screens/settingScreen/concertRegistScreen/ConcertRegistScreen';
import COncertRegistInfoScreen from '../screens/settingScreen/concertRegistScreen/ConcertRegistInfoScreen';

const Stack = createNativeStackNavigator();
// 키워드 인자를 사용할 경우 인자 타입 받는 부분 변경해야함. 현재 X
// header style을 위한 변수
const options = (headerShown: boolean, title: string) => {
  return {
    headerShown: headerShown,
    title: title,
    headerStyle: {
      backgroundColor: 'black',
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
        name="ConcertRegist"
        component={ConcertRegistScreen}
        options={options(true, '')}
      />
      <Stack.Screen
        name="ConcertRegistInfo"
        component={COncertRegistInfoScreen}
        options={options(true, '')}
      />
    </Stack.Navigator>
  );
}

export default gestureHandlerRootHOC(MainStack);
