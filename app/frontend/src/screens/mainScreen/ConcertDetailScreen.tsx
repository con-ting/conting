import {Animated, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft} from 'iconsax-react-native';
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
import {useEffect, useRef, useState} from 'react';
import ConcertBottomButtons from '../../components/button/ConcertBottomButtons';
import SingerProfile from '../../components/card/SingerProfile';
import {ConcertDetailApi} from '../../api/catalog/concert';
import Loading from '../../components/loader/Loading';
import {korDateFormatString} from '../../utils/common/TimeFormat';
import {getColors} from 'react-native-image-colors';
import {alertAndLog} from '../../utils/common/alertAndLog';

export default function ConcertDetailScreen({route}) {
  // 지도 토글을 위한
  const show_id = route.params.show_id;
  const [isRender, setIsRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [concertDetail, setConcertDetail] = useState(null);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const navigation = useNavigation();
  // 스크롤 위치 추적을 위한 Animated.Value
  const scrollY = useRef(new Animated.Value(0)).current;

  // fetchData 함수는 이제 useEffect 바깥에서 정의되며, 필요한 값을 파라미터로 받는다.

  useEffect(() => {
    const fetchData = (show_id: string) => {
      setTimeout(async () => {
        try {
          const data = await ConcertDetailApi(show_id);
          setConcertDetail(data);
          getColors(data.show.poster, {
            cache: true,
            key: data.show.poster,
          }).then((res): any => {
            console.log(res);
            setBackgroundColors([res.dominant, res.lightMuted, res.vibrant]);
          });
        } catch (error) {
          console.error('API 호출 중 오류 발생: ', error);
          // 에러 처리 로직 추가...
          alertAndLog('', '공연 정보 로드 중 오류가 발생했습니다.');
          navigation.goBack();
        }
      }, 500);
    };
    fetchData(show_id);
  }, []);

  // 콘서트 데이터와 색이 아직 렌더링 되지 않았을 경우 로딩
  if (!concertDetail || !backgroundColors.length) {
    return <Loading />;
  }
  return (
    <>
      <LinearGradient
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        style={{
          flex: 1,
          // marginTop: 50,
        }}
        colors={backgroundColors}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          style={{
            flex: 1,
            padding: 10,
          }}>
          <View style={styles.topContainer}>
            <ArrowLeft
              onPress={() => navigation.goBack()}
              color="white"
              size={30}
            />
            <Text style={{...F_SIZE_HEADER, marginTop: heightPercent(20)}}>
              {concertDetail.show.title}
            </Text>
          </View>
          <SummaryCard info={concertDetail} />
          {/* <Text style={F_SIZE_BBIGTEXT}>{concertDetail.show.description}</Text> */}
          <Outline show={concertDetail.show} />
          <Price gradeList={concertDetail.grade} />
          {/* <View style={styles.title}>
            <Text style={F_SIZE_BTITLE}>공연장</Text>
          </View> */}
          <View style={styles.hall}>
            <ConcertHallCard
              onPress={() => {
                setIsRender(true);
                setIsVisible(!isVisible);
              }}
              onBtnPress={() =>
                navigation.navigate('hallDetail', {
                  hallName: concertDetail.hall.name,
                })
              }
              title={concertDetail.hall.name}
              seat={concertDetail.hall.seat_total}
              address={concertDetail.hall.address}
            />
          </View>
          {isRender ? (
            <MapView
              style={isVisible ? {width: 400, height: 400} : false}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: concertDetail.hall.x,
                longitude: concertDetail.hall.y,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker
                coordinate={{
                  latitude: 37.520555375455,
                  longitude: 127.11505129348,
                }}
                title={concertDetail.hall.name}
                description="공연장입니다."
              />
            </MapView>
          ) : (
            false
          )}
          <View style={styles.casts}>
            <Text style={F_SIZE_BTITLE}>출연</Text>
            <View style={styles.row}>
              {concertDetail.singers.map(singer => {
                return (
                  <SingerProfile
                    key={singer.id}
                    id={singer.id}
                    name={singer.name}
                    profile={singer.profile}
                    backgroundNone={true}
                  />
                );
              })}
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
              width: 'auto',
              height: heightPercent(5000),
            }}>
            <View style={{padding: 10}}>
              <Text style={F_SIZE_BTITLE}>작품 설명</Text>
            </View>
            <FastImage
              resizeMode={FastImage.resizeMode.stretch}
              style={{width: '100%', height: '100%', marginTop: 20}}
              source={{uri: concertDetail.show.description_image}}
            />
          </View>
        </Animated.ScrollView>
        <ConcertBottomButtons
          scrollY={scrollY}
          schedule={[concertDetail.schedule]}
          showID={show_id}
        />
      </LinearGradient>
    </>
  );
}
const Outline = ({show}) => {
  console.log('outline', show);
  return (
    <View>
      {show.description && (
        <View style={styles.outline}>
          <Text style={F_SIZE_BTITLE}>개요</Text>
          <Text style={F_SIZE_BBIGTEXT}>{show.description}</Text>
        </View>
      )}
      <View style={styles.outline}>
        <Text style={F_SIZE_BTITLE}>시간</Text>
        <Text style={F_SIZE_BBIGTEXT}>
          {korDateFormatString(show.start_date)}
        </Text>
        <Text style={F_SIZE_BBIGTEXT}>
          {korDateFormatString(show.end_date)}
        </Text>
      </View>
      <View style={styles.reserve}>
        <Text style={F_SIZE_BTITLE}>예매 방식</Text>
        <Text style={F_SIZE_BBIGTEXT}>선착순</Text>
      </View>
    </View>
  );
};

const Price = ({gradeList}) => {
  return (
    <View style={styles.price}>
      <Text style={F_SIZE_BTITLE}>가격</Text>
      <View>
        {gradeList.map((item, idx) => (
          <View key={idx}>
            <View style={styles.priceInfo}>
              <Text style={F_SIZE_BBIGTEXT}>{item.grade}</Text>
              <Text style={F_SIZE_BBIGTEXT}>￦ {item.price}</Text>
            </View>
            <View style={styles.line} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    padding: widthPercent(20),
  },
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
