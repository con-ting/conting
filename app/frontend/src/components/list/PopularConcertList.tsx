import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_HEADER, F_SIZE_TITLE, F_SIZE_Y_TITLE} from '../../config/Font';
import {useEffect, useState} from 'react';
import {getColors} from 'react-native-image-colors';
import Carousel from 'react-native-reanimated-carousel';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {currentColor, pastColor} from '../../utils/recoil/Atoms';
import {Spacer} from '../../utils/common/Spacer';
import formatSido from './../../utils/common/SidoFormat';

// 인기 콘서트 조회
type PopularConcertListProps = {
  popularConcert: any;
};

export default function PopularConcertList({
  popularConcert,
}: PopularConcertListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const setPreviousColor = useSetRecoilState(pastColor);
  const [currentColors, setCurrentColors] = useRecoilState(currentColor);

  const navigation = useNavigation();

  useEffect(() => {
    getColors(popularConcert[currentIndex].poster, {
      cache: true,
      key: popularConcert[currentIndex].poster,
    }).then((res): any => {
      setPreviousColor(currentColors);
      setCurrentColors([res.dominant, res.lightMuted, res.vibrant]);
    });
  }, [currentIndex]);

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      show_id: number;
      poster: string;
      title: string;
      hall_name: string;
      hall_address: string;
    };
    index: number;
  }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('상세 페이지로 이동', item.show_id),
            navigation.navigate('ConcertDetail', {
              show_id: item.show_id,
            });
        }}>
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
              marginTop: 20,
            }}>
            <Text style={F_SIZE_Y_TITLE}>선착순 예매</Text>
            <Spacer space={10} />
            <Text style={F_SIZE_HEADER} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Spacer space={5} />
            <Text style={F_SIZE_TITLE}>
              {formatSido(item.hall_address)} • {item.hall_name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Carousel
      data={popularConcert}
      renderItem={renderItem}
      width={Dimensions.get('screen').width}
      height={Dimensions.get('window').height * 0.7}
      onSnapToItem={index => {
        setCurrentIndex(index);
      }}
      defaultIndex={0}
      mode="parallax"
    />
  );
}
