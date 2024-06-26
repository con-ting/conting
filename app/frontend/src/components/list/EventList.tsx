import {
  StyleSheet,
  Text,
  View,
  Image,
  ColorValue,
  Dimensions,
} from 'react-native';
import {BlueButton} from '../button/Button';
import {fontPercent, heightPercent} from '../../config/Dimensions';
import {widthPercent} from './../../config/Dimensions';
import {
  F_SIZE_BIGTEXT,
  F_SIZE_TEXT,
  F_SIZE_TITLE,
  F_SIZE_Y_BIGTEXT,
  F_SIZE_Y_TITLE,
} from '../../config/Font';
import {Spacer} from '../../utils/common/Spacer';
import {MAINBLACK} from '../../config/Color';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import SingerProfile from '../card/SingerProfile.tsx';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {SlideModal} from '../modal/Modal.tsx';
import SelectNftScreen from '../../screens/mainScreen/eventScreen/SelectNftScreen.tsx';
import Carousel from 'react-native-reanimated-carousel';

export default function EventList(props: {events: Array<any>}) {
  const [timer, setTimer] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectNftModalVisible, setSelectNftModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const start = moment(startTime);
      const end = moment(endTime);

      if (now.isBefore(start)) {
        const duration = moment.duration(start.diff(now));
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setTimer(`시작까지 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
      } else if (now.isAfter(end)) {
        setTimer('마감됨');
      } else {
        const duration = moment.duration(end.diff(now));
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setTimer(`마감까지 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  useEffect(() => {
    console.log(props.events);
    const setTime = () => {
      setStartTime(props.events[currentIndex].start_at);
      setEndTime(props.events[currentIndex].end_at);
    };
    if (props.events.length) {
      setTime();
    }
  }, [props.events, currentIndex]);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View style={styles.cardContainer}>
          <View
            style={{
              flex: 4,
              borderRadius: widthPercent(10),
            }}>
            <Image
              style={{
                width: '100%',
                height: heightPercent(300),
                borderRadius: widthPercent(10),
                resizeMode: 'stretch',
              }}
              source={{
                uri: item.img_url,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              padding: widthPercent(20),
            }}>
            <Text style={F_SIZE_Y_TITLE}>{item.name}</Text>
            <Spacer space={10} />
            <View>
              <Text style={F_SIZE_BIGTEXT}>
                {' '}
                {item.participants}개 응모권 접수 중
              </Text>
              <Text style={F_SIZE_BIGTEXT}>
                상품 개수 : {item.winnersTotal}개
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectNftModalVisible(true);
            }}
            style={{
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Text style={F_SIZE_Y_TITLE}>응모하기</Text>
          </TouchableOpacity>
        </View>
        <SlideModal
          isVisible={selectNftModalVisible}
          setIsVisible={setSelectNftModalVisible}>
          <SelectNftScreen selectItem={item}></SelectNftScreen>
        </SlideModal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BlueButton
          onPress={() => true}
          width={100}
          textSize={fontPercent(14)}
          btnText="응모 이벤트"
          borderWidth={3}
          disabled={true}
        />
        <Text style={{...F_SIZE_BIGTEXT, flex: 1}}>
          나의 <Text style={F_SIZE_Y_BIGTEXT}>NFT 티켓</Text> 으로 응모하면 득템
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={{...F_SIZE_TITLE, color: MAINBLACK}}>{timer}</Text>
      </View>
      {/*name: props.web3Data.account.name,*/}
      {/*img_url: props.web3Data.account.uri,*/}
      {/*participants: props.web3Data.account.participants,*/}
      {/*winnersTotal: props.web3Data.account.winnersTotal,*/}
      {/*img_tag: img_tag,*/}
      {/*img_tag_color: img_tag_color,*/}
      {/*start_at: new Date(startTimestamp).toISOString(),*/}
      {/*end_at: new Date(endTimestamp).toISOString(),*/}
      {/*doItPress: props.doItPress,*/}
      <View style={{flex: 4}}>
        <Carousel
          data={props.events}
          renderItem={renderItem}
          width={Dimensions.get('screen').width * 0.9}
          defaultIndex={0}
          mode="parallax"
          onSnapToItem={index => {
            setCurrentIndex(index);
          }}
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.8,
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-30, 30],
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPercent(10),
    height: heightPercent(600),
    marginBottom: heightPercent(20),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: widthPercent(10),
  },
  titleContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPercent(10),
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 0.5,
    borderRadius: widthPercent(10),
    backgroundColor: 'rgba(242,242,242,0.8)',
  },
  cardContainer: {
    marginTop: 10,
    borderRadius: widthPercent(10),
    flex: 1,
    width: '100%',
    backgroundColor: '#1C1C1C',
  },
});
