import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRecoilValue} from 'recoil';
import {posterColor} from '../../utils/recoil/Atoms';
import {ArrowLeft, Back} from 'iconsax-react-native';
import {
  F_SIZE_BBIGTEXT,
  F_SIZE_BTITLE,
  F_SIZE_HEADER,
  F_SIZE_Y_TITLE,
} from '../../config/Font';
import {useNavigation} from '@react-navigation/native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import SummaryCard from '../../components/concertDetail/SummaryCard';
import ConcertHallCard from '../../components/card/ConcertHallCard';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import {useRef, useState} from 'react';
import ConcertBottomButtons from '../../components/button/ConcertBottomButtons';
import SingerProfile from '../../components/card/SingerProfile';

export default function ConcertDetailScreen({route}) {
  // 배경색을 recoil에서 받아오기
  const [isRender, setIsRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const backgroundColor = useRecoilValue(posterColor);
  const navigation = useNavigation();
  const concertInfo =
    'https://ticketimage.interpark.com/Play/image/etc/24/24002190-04.jpg';
  const info = route.params.item;
  // 스크롤 위치 추적을 위한 Animated.Value
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <ImageBackground
      blurRadius={2}
      resizeMode="stretch"
      style={{flex: 1, justifyContent: 'space-between'}}
      source={{uri: info.poster}}>
      <ArrowLeft onPress={() => navigation.goBack()} color="white" size={48} />
      <Text style={F_SIZE_HEADER}>{info.title}</Text>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={{
          flex: 1,

          // marginTop: 50,
        }}
        colors={backgroundColor}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          style={{
            padding: widthPercent(15),
          }}>
          <SummaryCard info={info} />
          <Outline content="내용" />
          <Price />
          {/* <View style={styles.title}>
            <Text style={F_SIZE_BTITLE}>공연장</Text>
          </View> */}
          <View style={styles.hall}>
            <ConcertHallCard
              onPress={() => {
                setIsRender(true);
                setIsVisible(!isVisible);
              }}
              onBtnPress={() => console.log('공연장 시야 보기로 이동')}
              title="KSPO DOME"
              seat={14730}
              address="서울특별시 송파구 올림픽로 424"
            />
          </View>
          {isRender ? (
            <MapView
              style={isVisible ? {width: 400, height: 400} : false}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.520555375455,
                longitude: 127.11505129348,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker
                coordinate={{
                  latitude: 37.520555375455,
                  longitude: 127.11505129348,
                }}
                title="공연장"
                description="this is a marker example"
              />
            </MapView>
          ) : (
            false
          )}
          <View style={styles.casts}>
            <Text style={F_SIZE_BTITLE}>출연</Text>
            <View style={styles.row}>
              <SingerProfile
                name="아이유"
                profile="https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.png"
                backgroundNone={true}
              />
              <SingerProfile
                name="장기하"
                profile="https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.png"
                backgroundNone={true}
              />
            </View>
          </View>
          <View style={styles.refund}>
            <Text style={F_SIZE_BTITLE}>취소 수수료</Text>
            <Text style={F_SIZE_Y_TITLE}>예매일 기준</Text>
            <View style={styles.rowSpace}>
              <Text style={F_SIZE_BBIGTEXT}>1일 ~ 7일</Text>
              <Text style={F_SIZE_BBIGTEXT}>없음</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.rowSpace}>
              <Text style={F_SIZE_BBIGTEXT}>8일</Text>
              <Text style={F_SIZE_BBIGTEXT}>없음</Text>
            </View>
            <View style={styles.line} />
            <Text style={F_SIZE_Y_TITLE}>관람일 기준</Text>
            <View style={styles.rowSpace}>
              <Text style={F_SIZE_BBIGTEXT}>7일 ~ 9일</Text>
              <Text style={F_SIZE_BBIGTEXT}>10%</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.rowSpace}>
              <Text style={F_SIZE_BBIGTEXT}>3일 ~ 6일</Text>
              <Text style={F_SIZE_BBIGTEXT}>20%</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.rowSpace}>
              <Text style={F_SIZE_BBIGTEXT}>1일 ~ 2일</Text>
              <Text style={F_SIZE_BBIGTEXT}>30%</Text>
            </View>
            <View style={styles.line} />
          </View>
          <View
            style={{
              marginTop: widthPercent(20),
              width: widthPercent(400),
              height: heightPercent(5000),
            }}>
            <View style={{padding: 10}}>
              <Text style={F_SIZE_BTITLE}>작품 설명</Text>
            </View>
            <FastImage
              resizeMode={FastImage.resizeMode.stretch}
              style={{width: 400, height: '100%', marginTop: 20}}
              source={{uri: concertInfo}}
            />
          </View>
        </Animated.ScrollView>
      </LinearGradient>
      <ConcertBottomButtons scrollY={scrollY} />
    </ImageBackground>
  );
}
const Outline = ({content}: {content: string}) => {
  return (
    <View>
      <View style={styles.outline}>
        <Text style={F_SIZE_BTITLE}>개요</Text>
        <Text style={F_SIZE_BBIGTEXT}>
          태양을 머금고 날아든 온기 새로이 움트는 모든 이들을 향해 2024년의
          아이유&장기하 O. U. R. Tour를 시작합니다.
        </Text>
      </View>
      <View style={styles.outline}>
        <Text style={F_SIZE_BTITLE}>시간</Text>
        <Text style={F_SIZE_BBIGTEXT}>2024. 03. 02. (토) 19:00</Text>
        <Text style={F_SIZE_BBIGTEXT}>2024. 03. 10. (일) 20:00</Text>
      </View>
      <View style={styles.reserve}>
        <Text style={F_SIZE_BTITLE}>예매 방식</Text>
        <Text style={F_SIZE_BBIGTEXT}>선착순</Text>
      </View>
    </View>
  );
};

const Price = () => {
  return (
    <View style={styles.price}>
      <Text style={F_SIZE_BTITLE}>가격</Text>
      <View>
        <View style={styles.priceInfo}>
          <Text style={F_SIZE_BBIGTEXT}>가구역</Text>
          <Text style={F_SIZE_BBIGTEXT}>￦ 165,000</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.priceInfo}>
          <Text style={F_SIZE_BBIGTEXT}>나구역</Text>
          <Text style={F_SIZE_BBIGTEXT}>￦ 154,000</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.priceInfo}>
          <Text style={F_SIZE_BBIGTEXT}>다구역</Text>
          <Text style={F_SIZE_BBIGTEXT}>￦ 99,000</Text>
        </View>
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: widthPercent(380),
    height: heightPercent(350),
  },
  outline: {
    marginTop: widthPercent(20),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: widthPercent(16),
    height: heightPercent(140),
    padding: widthPercent(20),
    gap: widthPercent(10),
  },
  reserve: {
    marginTop: widthPercent(20),
    height: heightPercent(100),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: widthPercent(16),
    padding: widthPercent(20),
    gap: widthPercent(10),
  },
  price: {
    marginTop: widthPercent(20),
    height: heightPercent(180),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: widthPercent(16),
    padding: widthPercent(20),
    gap: widthPercent(10),
    justifyContent: 'space-between',
  },
  casts: {
    marginTop: widthPercent(10),
    height: heightPercent(190),
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: widthPercent(16),
    padding: widthPercent(20),
    gap: widthPercent(10),
    justifyContent: 'space-between',
  },
  refund: {
    marginTop: widthPercent(20),
    height: heightPercent(400),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: widthPercent(16),
    padding: widthPercent(20),
    gap: widthPercent(10),
    justifyContent: 'space-between',
  },

  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    marginTop: widthPercent(5),
    marginBottom: widthPercent(5),
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    borderWidth: 1,
  },
  hall: {
    alignItems: 'center',
    marginTop: widthPercent(20),
  },
  title: {
    marginTop: widthPercent(20),
  },
  row: {
    flexDirection: 'row',
    gap: widthPercent(20),
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
