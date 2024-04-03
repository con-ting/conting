import {useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import TicketEntryCard from './../../components/card/TicketEntryCard';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {widthPercent} from '../../config/Dimensions';
import {getColors} from 'react-native-image-colors';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Canvas, LinearGradient, Rect, vec} from '@shopify/react-native-skia';
import {getTicketListAPI} from '../../api/ticket/ticket';
import {useRealm} from '../../components/realm/RealmContext';
import {fetchScheduleDetails} from '../../utils/realm/dao/OrderResultQuery';
import Loading from '../../components/loader/Loading';
import { F_SIZE_BUTTON } from '../../config/Font';

export default function TicketListScreen() {
  const navigation = useNavigation();
  const realm = useRealm();
  const [ticketList, setTicketList] = useState([{}]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posterColors, setPosterColors] = useState([
    '#000000',
    '#000000',
    '#000000',
  ]);
  const firstColor = useSharedValue(posterColors[0]);
  const secondColor = useSharedValue(posterColors[1]);
  const thirdColor = useSharedValue(posterColors[2]);
  const {width, height} = useWindowDimensions();

  // 뒷배경 애니메이션을 위한 부분
  const duration = 1000;
  const colors = useDerivedValue(() => {
    return [firstColor.value, secondColor.value, thirdColor.value];
  }, []);
  useEffect(() => {
    const onChange = async () => {
      firstColor.value = withTiming(posterColors[0], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      secondColor.value = withTiming(posterColors[1], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      thirdColor.value = withTiming(posterColors[2], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
    };
    onChange();
  }, [posterColors]);

  // 배경색 가져오기
  useEffect(() => {
    if (!ticketList.length) {
      return;
    }
    getColors(ticketList[currentIndex]?.poster, {
      cache: true,
      key: ticketList[currentIndex]?.poster,
    }).then((res): any => {
      setPosterColors([res?.dominant, res.muted, res.average]);
    });
  }, [currentIndex, ticketList]);

  // 티켓 리스트 불러올 API 호출
  useEffect(() => {
    const getInfo = async () => {
      const res = await getTicketListAPI();
      console.log(res);
      let tickets: Array<any> = [];
      await res.forEach((ticket: any) => {
        const concertdata = fetchScheduleDetails(
          realm,
          parseInt(ticket.schedule_id),
        );
        console.log('concertdata : ', concertdata, 'type:');
        tickets.push({
          id: ticket.ticket_id,
          poster: concertdata?.img,
          title: concertdata?.title,
          date: concertdata?.start_time,
          location: concertdata?.hall_name,
          row: ticket.row,
          col: ticket.col,
        });
      });
      setTicketList(tickets);
    };
    getInfo();
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <TicketEntryCard ticket={item} colors={posterColors} />
      </View>
    );
  };
  if (!ticketList.length) {
    return (
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }}>
        <Text style={F_SIZE_BUTTON}>구매한 티켓이 없어요 ㅠㅠㅠㅠ</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(100, 0)}
            end={vec(width, height / 2)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      <Carousel
        data={ticketList}
        renderItem={renderItem}
        width={widthPercent(400)}
        mode="horizontal-stack"
        modeConfig={{
          moveSize: 100,
          stackInterval: 50,
          scaleInterval: 0.1,
          rotateZDeg: 80,
        }}
        onSnapToItem={index => {
          setCurrentIndex(index);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
