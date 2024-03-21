import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/mainScreen/MainScreen';
import ReservationWaitingScreen from '../screens/lotteryResultScreen/ReservationWaitingScreen';
import TicketListScreen from '../screens/ticketEntryScreen/TicketListScreen';
import {TicketApplyListScreen} from '../screens/ticketApplyScreen/TicketApplyListScreen';
import {MyPageScreen} from '../screens/settingScreen/MyPageScreen';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Home,
  CardPos,
  Ticket,
  Element3,
  User,
  Notification,
} from 'iconsax-react-native';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import WaitingScreen from '../screens/mainScreen/ticketingScreen/WaitingScreen';
import SeatingAreaSelectScreen from '../screens/mainScreen/ticketingScreen/SeatingAreaSelectScreen';
import {heightPercent} from '../config/Dimensions';
import PaymentScreen from '../screens/mainScreen/ticketingScreen/PaymentScreen';
import ResultScreen from '../screens/mainScreen/ticketingScreen/ResultScreen';
import RefundInfoScreen from '../screens/ticketEntryScreen/ticketRefundScreen/RefundInfoScreen';
import ResultRefundScreen from '../screens/mainScreen/ticketingScreen/ResultRefundScreen';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const GradientIcon = ({focused}: any) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <LinearGradient
        colors={['#FCC434', 'transparent']} // 위에서 아래로 불투명에서 투명으로 변화하는 그라데이션
        start={{x: 0.1, y: 0}}
        end={{x: 0.5, y: 0.8}}
        style={{
          width: 90,
          height: 90,
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 7, // 그라데이션 테두리를 더 잘 보이게 하기 위해
          borderColor: 'transparent', // 테두리를 투명하게 하여 그라데이션만 보이도록 함
        }}>
        <View
          style={{
            width: 70, // 실제 아이콘 크기보다 조금 작게 설정하여 그라데이션 테두리가 보이게 함
            height: 70,
            borderRadius: 40, // 원형
            backgroundColor: 'black', // 아이콘 배경색, 필요에 따라 조정
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ticket
            size={25}
            color={focused ? '#FCC434' : '#FFFFFF'} // 선택 상태에 따라 아이콘 색상 변경
          />
          <Text
            style={{
              color: focused ? '#FCC434' : '#FFFFFF',
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            입장권
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false, // 탭 마다의 헤더 디바이스에서 표시하지 않음
        tabBarStyle: {
          backgroundColor: 'black',
          height: 60, // 전체 하단 네비게이션 바의 높이를 조정
          paddingBottom: 5, // 네비게이션 바의 하단 패딩 추가
          paddingTop: 5, // 네비게이션 바의 상단 패딩 추가
          borderTopColor: 'black',
        },
      }}>
      <BottomTab.Screen
        name={'Main'}
        component={MainScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: 'black'},
          tabBarIcon: ({focused}) => (
            <Home
              style={{color: focused ? '#FCC434' : '#CCCCCC'}}
              variant="Bold"
              size={25}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#FCC434' : '#CCCCCC',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              홈
            </Text>
          ),
          headerTitle: () => (
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../assets/images/mainLogo.png')} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontFamily: 'Jalnan2TTF',
                  }}>
                  BLACK PANTHER
                </Text>
                <Text
                  style={{
                    color: '#3D3B3B',
                    fontSize: 12,
                    fontFamily: 'Jalnan2TTF',
                  }}>
                  암표방지티켓팅서비스
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Notification color="#FFFFFF" size={30} variant="Bold" />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name={'추첨결과'}
        component={ReservationWaitingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CardPos
              style={{color: focused ? '#FCC434' : '#CCCCCC'}}
              size={25}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#FCC434' : '#CCCCCC',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              추첨결과
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name={'입장권'}
        component={TicketListScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // "입장권" 탭만 더 높이 조정
                marginBottom: 30, // 다른 탭보다 더 높게 위치하도록 마진 조정
              }}>
              <GradientIcon focused={focused} />
            </View>
          ),
          tabBarLabel: () => null, // 탭 라벨 사용하지 않음
        }}
      />
      <BottomTab.Screen
        name={'티켓북'}
        component={TicketApplyListScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Element3
              style={{color: focused ? '#FCC434' : '#CCCCCC'}}
              size={25}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#FCC434' : '#CCCCCC',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              티켓북
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name={'내정보'}
        component={MyPageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <User style={{color: focused ? '#FCC434' : '#CCCCCC'}} size={25} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#FCC434' : '#CCCCCC',
                fontWeight: 'bold',

                marginTop: 5,
              }}>
              내정보
            </Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Waiting"
          component={WaitingScreen}
          options={{
            headerShown: true,
            tabBarVisible: false,
            title: '대기열',
            headerStyle: {
              backgroundColor: 'black',
              borderBottomColor: 'transparent', //헤더 테두리 색 제거
              elevation: 0, //Android에서 헤더 그림자 제거
              height: heightPercent(60),
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Jalnan2TTF',
            },
            headerTitleAlign: 'center',
            // 개별 스크린에 이펙트 적용 (현재 대기열 진입시 오른쪽에서 왼쪽으로 페이지 전환)
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
        <Stack.Screen
          name="SeatArea"
          component={SeatingAreaSelectScreen}
          options={{
            headerShown: true,
            tabBarVisible: false,
            title: '구역 선택',
            headerStyle: {
              backgroundColor: 'black',
              borderBottomColor: 'transparent', //헤더 테두리 색 제거
              elevation: 0, //Android에서 헤더 그림자 제거
              height: heightPercent(60),
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Jalnan2TTF',
            },
            headerTitleAlign: 'center',
            // 개별 스크린에 이펙트 적용 (현재 대기열 진입시 오른쪽에서 왼쪽으로 페이지 전환)
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
        <Stack.Screen
          name="Pay"
          component={PaymentScreen}
          options={{
            headerShown: true,
            tabBarVisible: false,
            title: '결제하기',
            headerStyle: {
              backgroundColor: 'black',
              borderBottomColor: 'transparent', //헤더 테두리 색 제거
              elevation: 0, //Android에서 헤더 그림자 제거
              height: heightPercent(60),
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Jalnan2TTF',
            },
            headerTitleAlign: 'center',
            // 개별 스크린에 이펙트 적용 (현재 대기열 진입시 오른쪽에서 왼쪽으로 페이지 전환)
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            headerShown: false,
            tabBarVisible: false,
            // 개별 스크린에 이펙트 적용 (현재 대기열 진입시 오른쪽에서 왼쪽으로 페이지 전환)
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
        <Stack.Screen
          name="Refund"
          component={RefundInfoScreen}
          options={{
            headerShown: true,
            tabBarVisible: false,
            title: '구매 내역',
            headerStyle: {
              backgroundColor: 'black',
              borderBottomColor: 'transparent', //헤더 테두리 색 제거
              elevation: 0, //Android에서 헤더 그림자 제거
              height: heightPercent(60),
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Jalnan2TTF',
            },
            headerTitleAlign: 'center',
            // 개별 스크린에 이펙트 적용 (현재 대기열 진입시 오른쪽에서 왼쪽으로 페이지 전환)
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
        <Stack.Screen
          name="ResultRefund"
          component={ResultRefundScreen}
          options={{
            headerShown: false,
            tabBarVisible: false,
            // 개별 스크린에 이펙트 적용 (현재 대기열 진입시 오른쪽에서 왼쪽으로 페이지 전환)
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
