import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/mainScreen/MainScreen';
import TicketListScreen from '../screens/ticketEntryScreen/TicketListScreen';
import NftTicketListScreen from '../screens/ticketApplyScreen/NftTicketListScreen.tsx';
import MyPageScreen from '../screens/settingScreen/MyPageScreen';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {LinearGradient as ReactNativeLinearGradient} from 'react-native-linear-gradient';
import {
  Home,
  CardPos,
  Ticket,
  Element3,
  User,
  SearchNormal,
} from 'iconsax-react-native';
import {useRecoilValue} from 'recoil';
import ResultMainScreen from '../screens/lotteryResultScreen/ResultMainScreen';
import {currentColor, pastColor} from '../utils/recoil/Atoms';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Canvas, Rect, LinearGradient, vec} from '@shopify/react-native-skia';

const BottomTab = createBottomTabNavigator();

const GradientIcon = ({focused}: any) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <ReactNativeLinearGradient
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
      </ReactNativeLinearGradient>
    </View>
  );
};

export default function BottomTabNavigator() {
  const currentColors = useRecoilValue(currentColor);
  const firstColor = useSharedValue(currentColors[0]);
  const secondColor = useSharedValue(currentColors[1]);
  const thirdColor = useSharedValue(currentColors[2]);
  const {width, height} = useWindowDimensions();

  // 뒷배경 애니메이션을 위한 부분
  const duration = 1000;
  const colors = useDerivedValue(() => {
    return [firstColor.value, secondColor.value, thirdColor.value];
  }, []);

  useEffect(() => {
    const onChange = async () => {
      firstColor.value = withTiming(currentColors[0], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      secondColor.value = withTiming(currentColors[1], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      thirdColor.value = withTiming(currentColors[2], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
    };
    onChange();
  }, [currentColors]);

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
          headerBackground: () => {
            return (
              <Canvas style={{flex: 1}}>
                <Rect x={0} y={0} width={width} height={100}>
                  <LinearGradient
                    start={vec(100, 0)}
                    end={vec(width, height / 2)}
                    colors={colors}
                  />
                </Rect>
              </Canvas>
            );
          },
          tabBarIcon: ({focused}) => (
            <Home
              color={focused ? '#FCC434' : '#CCCCCC'}
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
              <FastImage
                style={{width: 100, height: 40}}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../assets/logo/logoPng.png')}
              />
            </View>
          ),
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <View style={{marginRight: 10}}>
                <TouchableOpacity>
                  <SearchNormal
                    color="#FFFFFF"
                    size={30}
                    onPress={() => navigation.navigate('SearchMain')}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <BottomTab.Screen
        name={'ResultMainScreen'}
        component={ResultMainScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CardPos color={focused ? '#FCC434' : '#CCCCCC'} size={25} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#FCC434' : '#CCCCCC',
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              결제내역
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
        component={NftTicketListScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Element3 color={focused ? '#FCC434' : '#CCCCCC'} size={25} />
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
            <User color={focused ? '#FCC434' : '#CCCCCC'} size={25} />
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
