import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TicketEntryCard from './../../components/card/TicketEntryCard';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {widthPercent} from '../../config/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {getColors} from 'react-native-image-colors';

export default function TicketListScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posterColors, setPosterColors] = useState(['#000000', '#000000']);

  // 기기가 생체 인식이 가능한지 확인하는
  useEffect(() => {
    getColors(concertList[currentIndex].poster, {
      cache: true,
      key: concertList[currentIndex].poster,
    }).then((res): any => {
      setPosterColors([res?.dominant, res.muted, res.average]);
    });
  }, [currentIndex]);

  const concertList = [
    {
      show_id: 2,
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxNzEwMTFfMjY3%2FMDAxNTA3NzIzNjU0MjM1.kTHfzzQ5oZEEl0cUUpEwsklfZq_HhzfOckVtOspfVwEg._0FoK4KQ6_eqwt7vRGVLNcZ90leatv1A_QiPL7mD-Cgg.JPEG.yun1202%2FexternalFile.jpg&type=a340',
      title: '아이유 콘서트',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 3,
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMjdfNDAg%2FMDAxNzA5MDAyNzcyNjkz.WDAo2Onr02R_VYBwY1biISc9F534ufC9TpUbzsWzYeIg.G6Qq_-fvzXSbUKmoSjgcmiAsAuA2DX_7jcBUskT_5bog.JPEG%2FIMG_5589.jpg&type=a340',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 4,
      poster:
        'https://shopping-phinf.pstatic.net/main_4466065/44660653345.1.jpg?type=f300',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 5,
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231213_263%2F1702439479789j6cid_JPEG%2F269_image_url_1702439479766.jpg',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 6,
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODExMTlfOTgg%2FMDAxNTQyNjE0ODMwMzY0.yvRdj5mecR1HfyCf-ND24sGy4Nvwoao4BKu9kV97y60g.r2LZzxYHnBWEtgkMGWSNPq8SbM0Cmf8uRviYXpPqCZUg.JPEG.dmsejrl1%2F6.jpg&type=a340',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 7,
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240219_172%2F17083253988697c6a1_JPEG%2F269_33689747_image_url_1708325398852.jpg',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 8,
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240131_125%2F1706681961365GvH5L_PNG%2F269_image_url_1706681961328.png',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.ticketContainer}>
        <TicketEntryCard poster={item.poster} colors={posterColors}/>
      </View>
    );
  };
  return (
    <LinearGradient style={styles.container} colors={posterColors}>
      <Carousel
        data={concertList}
        renderItem={renderItem}
        width={widthPercent(400)}
        mode="horizontal-stack"
        modeConfig={{
          moveSize: 100,
          stackInterval: 50,
          scaleInterval: 0.1,
          rotateZDeg: 80,
        }}
        onSnapToItem={index => setCurrentIndex(index)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    marginBottom: 50,
  },
});
