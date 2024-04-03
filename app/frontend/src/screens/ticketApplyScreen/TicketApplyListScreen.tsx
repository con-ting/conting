import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TicketEntryCard from './../../components/card/TicketEntryCard';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {widthPercent} from '../../config/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {getColors} from 'react-native-image-colors';
import NFTCard from '../../components/card/NFTCard.tsx';

export default function TicketApplyListScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posterColors, setPosterColors] = useState(['#000000', '#000000']);

  // 배경색 가져오기
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
      ticketAddress: 'Ati6E8fcVeugB8tHE4W3CUgcPFCR3wrMGushG4g8paFZ',
      ownerAddress: '8jQnaWEY6EQdSL3jS9XDuEqYgACPmXRaR7hup3NYnLwj',
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240131_125%2F1706681961365GvH5L_PNG%2F269_image_url_1706681961328.png',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      date: new Date(),
      location: 'SSAFY',
      row: '나',
      no: 4,
      webmUrl:
        'https://pub-42d3d2de01ff4e1baef74a4d07121130.r2.dev/1/290/38cd9a1e3cfc7a0811517aae38368ab23aab672694593b9ffbaeea9a0edd9a80.webm',
      isEventAble: true,
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.ticketContainer}>
        <NFTCard
          poster={item.poster}
          ticketAddress={item.ticketAddress}
          title={item.title}
          location={item.location}
          date={item.date}
          row={item.row}
          no={item.no}
          webmUrl={item.webmUrl}
          colors={posterColors}
        />
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
