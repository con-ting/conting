import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  fontPercent,
  widthPercent,
  heightPercent,
} from '../../config/Dimensions';
import {Glass} from 'iconsax-react-native';
import {CARDBASE} from '../../config/Color';

type ConcertHallCardProps = {
  onPress ?: () => void;
  onBtnPress ?: () => void;
  title: string;
  seat: number;
  address: string;
  isMain: boolean;
};

/**
 * ConcertHallCard입니다.
 * @param props
 * - onPress: 클릭 시 발생할 이벤트
 * - title: 해당 공연장의 이름
 * - seat: 해당 공연장의 좌석
 * - address: 해당 공연장의 주소
 * - isMain: 메인페이지인 경우 border 테두리 색상 적용
 * @returns
 * @author 전상혁
 */

export default function ConcertHallCard(props: ConcertHallCardProps) {
  //나중에 서버에서 선택한 공연의 공연장 정보를 가져올 예정
  //   const concertData = {
  //     title: 'KSPO DOME',
  //     seat: '14,730',
  //     address: '서울특별시 송파구 올림픽로 424',
  //   };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style={styles.titleContext}>
          <Text style={styles.title}>{props.title}</Text>
          <Glass onPress={props.onBtnPress} size="24" color="#FFFFFF" />
        </View>
        <View style={styles.infoContext}>
          <Text style={styles.info}>{props.seat}석</Text>
          <Text style={styles.info}> | </Text>
          <Text style={styles.info}>{props.address}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: widthPercent(360),
    height: heightPercent(90),
    borderRadius: 12,
    margin: 5,
    // borderWidth: 2,
    backgroundColor: CARDBASE,
    // borderColor: '#FCC434',
  },
  titleContext: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },

  infoContext: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
  },
  info: {
    fontSize: fontPercent(12),
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },

  title: {
    fontSize: fontPercent(20),
    color: '#FFFFFF',
    fontFamily: 'Jalnan2TTF',
  },
});
