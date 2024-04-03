import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  fontPercent,
  widthPercent,
  heightPercent,
} from '../../config/Dimensions';
import {Glass} from 'iconsax-react-native';
import {CARDBASE} from '../../config/Color';

type ConcertHallCardProps = {
  onPress?: () => void;
  onBtnPress?: () => void;
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
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style={styles.titleContext}>
          <Text style={styles.title}>{props.title}</Text>
          <Glass onPress={props.onBtnPress} size="24" color="#FFFFFF" />
        </View>
        <View style={styles.infoContext}>
          <Text
            style={styles.info}>{`${props.seat}석 | ${props.address}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightPercent(80),
    borderRadius: 12,
    backgroundColor: CARDBASE,
    paddingHorizontal: widthPercent(10),
  },
  titleContext: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoContext: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
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
