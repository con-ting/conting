import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainScreen} from '../screens/mainScreen/MainScreen';
import {ReservationWaitingScreen} from '../screens/lotteryResultScreen/ReservationWaitingScreen';
import {TicketListScreen} from '../screens/ticketEntryScreen/TicketListScreen';
import {TicketApplyListScreen} from '../screens/ticketApplyScreen/TicketApplyListScreen';
import {MyPageScreen} from '../screens/settingScreen/MyPageScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name={'홈'}
          component={MainScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                style={{color: focused ? '#FCC434' : '#CCCCCC'}}
                size={30}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#FCC434' : '#CCCCCC',
                  fontWeight: 'bold',
                }}>
                홈
              </Text>
            ),
          }}
        />
        <BottomTab.Screen
          name={'추첨결과'}
          component={ReservationWaitingScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="wallet"
                style={{color: focused ? '#FCC434' : '#CCCCCC'}}
                size={30}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#FCC434' : '#CCCCCC',
                  fontWeight: 'bold',
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
              <Icon
                name="phone"
                style={{color: focused ? '#FCC434' : '#CCCCCC'}}
                size={30}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#FCC434' : '#CCCCCC',
                  fontWeight: 'bold',
                }}>
                입장권
              </Text>
            ),
          }}
        />
        <BottomTab.Screen
          name={'티켓북'}
          component={TicketApplyListScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                style={{color: focused ? '#FCC434' : '#CCCCCC'}}
                size={30}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#FCC434' : '#CCCCCC',
                  fontWeight: 'bold',
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
              <Icon
                name="person-outline"
                style={{color: focused ? '#FCC434' : '#CCCCCC'}}
                size={30}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  color: focused ? '#FCC434' : '#CCCCCC',
                  fontWeight: 'bold',
                }}>
                내정보
              </Text>
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
