import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_HEADER, F_SIZE_TITLE, F_SIZE_Y_TITLE} from '../../config/Font';
import {useEffect, useState} from 'react';
import {getColors} from 'react-native-image-colors';
import Carousel from 'react-native-reanimated-carousel';

// 인기 콘서트 조회
type PopularConcertListProps = {
  popularConcert: any;
  getBackgroundColors: (colors: Array<string>) => void;
};

export default function PopularConcertList({
  popularConcert,
  getBackgroundColors,
}: PopularConcertListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const setColors = (colors: Array<string>) => {
    try {
      getBackgroundColors(colors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColors(popularConcert[currentIndex].poster, {
      cache: true,
      key: popularConcert[currentIndex].poster,
    }).then((res): any => {
      console.log(res)
      setColors([res?.dominant, res.muted, res.average,]);
    });
    console.log(currentIndex);
  }, [currentIndex]);

  const renderItem = ({
    item,
    index,
  }: {
    item: {poster: string; title: string; address: string};
    index: number;
  }) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: widthPercent(16),
            width: '90%',
            height: '80%',
            overflow: 'hidden',
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'stretch',
            }}
            source={{uri: item.poster}}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={F_SIZE_Y_TITLE}>선착순 예매</Text>
          <Text style={F_SIZE_HEADER}>{item.title}</Text>
          <Text style={F_SIZE_TITLE}>{item.address}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={popularConcert}
        renderItem={renderItem}
        width={Dimensions.get('screen').width}
        height={Dimensions.get('window').height * 0.7}
        onSnapToItem={index => setCurrentIndex(index)}
        defaultIndex={0}
        mode="parallax"
      />
    </View>
  );
}
