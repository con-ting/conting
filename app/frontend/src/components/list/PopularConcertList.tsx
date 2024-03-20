import {Dimensions, Image, Text, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_HEADER, F_SIZE_TEXT, F_SIZE_Y_BIGTEXT} from '../../config/Font';
import {useEffect, useState} from 'react';
import {getColors} from 'react-native-image-colors';
import Carousel from 'react-native-reanimated-carousel';

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
      console.log(res);
      setColors([res?.dominant, res?.average, res?.vibrant]);
    });
    console.log(currentIndex);
  }, [currentIndex]);

  const renderItem = ({
    item,
    index,
  }: {
    item: {poster: string};
    index: number;
  }) => {
    return (
      <View
        style={{
          marginVertical: heightPercent(30),
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: widthPercent(16),
            alignItems: 'center',
            overflow: 'hidden',
            width: widthPercent(250),
            height: heightPercent(400),
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={{uri: item.poster}}
          />
        </View>
        <Text style={F_SIZE_Y_BIGTEXT}>선착순 예매</Text>
        <Text style={F_SIZE_HEADER}>콘서트명</Text>
        <Text style={F_SIZE_TEXT}>서울 잠실 실내</Text>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={popularConcert}
        renderItem={renderItem}
        width={Dimensions.get('screen').width}
        height={heightPercent(440)}
        onSnapToItem={index => setCurrentIndex(index)}
        mode={'parallax'}
      />
    </View>
  );
}
