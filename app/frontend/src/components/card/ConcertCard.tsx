import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  fontPercent,
  widthPercent,
  heightPercent,
} from '../../config/Dimensions';
import {Calendar, Video} from 'iconsax-react-native';
import {
  F_SIZE_Y_BUTTON,
  F_SIZE_Y_HEADER,
  F_SIZE_Y_TITLE,
} from '../../config/Font';

type ConcertCardProps = {
  onPress: () => void;
  poster: string;
  title: string;
  address: string;
  date: string;
};

/**
 * ConcertCard입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - poster: 해당 콘서트의 이미지 포스터 URL
 * - title: 해당 콘서트의 제목
 * - address: 해당 콘서트의 공연장소
 * - date: 해당 콘서트의 공연 날짜
 * @returns
 * @author 전상혁
 */

export default function ConcertCard(props: ConcertCardProps) {
  //   const data = {
  //     title: '임영웅 콘서트 IM HERO TOUR 2023',
  //     img: require('../../assets/images/imyoungyoong.png'),
  //     address: '서울•킨텍스 1전시장 1..',
  //     date: '2024.04.22(월) 13:00',
  //   };
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style={styles.imageContainer}>
          <Image source={{uri: props.poster}} style={styles.image} />
        </View>
        <View
        style={{
          marginTop:heightPercent(20)
        }}
        >
          <Text style={F_SIZE_Y_BUTTON}>{props.title}</Text>
          <View style={styles.infoContainer}>
            <Video size={16} color="#FFFFFF" />
            <Text style={styles.context} numberOfLines={1} ellipsizeMode="tail">
              {props.address}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Calendar size={16} color="#FFFFFF" />
            <Text style={styles.context}>{props.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercent(180),
    height: heightPercent(350),
    margin: 10,
    // borderColor: '#FCC434',
  },
  imageContainer: {
    width: widthPercent(180),
    height: heightPercent(240),
    alignItems: 'center',
    borderRadius: widthPercent(16),
    overflow: 'hidden',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: widthPercent(180),
    height: heightPercent(240),
    // resizeMode: 'contain',
  },
  title: {
    fontSize: fontPercent(18),
    marginTop: 15,

    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
  context: {
    fontSize: fontPercent(14),
    margin: 4,
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
});
