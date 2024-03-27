import {StyleSheet, Text, View} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import ConcertHallCard from '../../../components/card/ConcertHallCard';

export default function ConcertHallScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        <ConcertHallCard
          title="KSPO DOME"
          seat={14730}
          address="서울 특별시 송파구 올림픽로 424"
        />
      </View>
      <View style={styles.cards}>
        <ConcertHallCard
          title="잠실종합운동장"
          seat={20000}
          address="서울 송파구 올림픽로 25 서울종합운동장"
        />
      </View>
      <View style={styles.cards}>
        <ConcertHallCard
          title="블루스퀘어 마스터 카드홀"
          seat={3000}
          address="서울특별시 울산구 이태원로 294"
        />
      </View>
      <View style={styles.cards}>
        <ConcertHallCard
          title="올림픽공원 올림픽홀"
          seat={3000}
          address="서울 송파구 방아동 88-2"
        />
      </View>
      <View style={styles.cards}>
        <ConcertHallCard
          title="올림픽공원 올림픽홀"
          seat={3000}
          address="서울 송파구 방아동 88-2"
        />
      </View>
      <View style={styles.cards}>
        <ConcertHallCard
          title="올림픽공원 올림픽홀"
          seat={3000}
          address="서울 송파구 방아동 88-2"
        />
      </View>
      <View style={styles.cards}>
        <ConcertHallCard
          title="올림픽공원 올림픽홀"
          seat={3000}
          address="서울 송파구 방아동 88-2"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  cards: {
    marginTop: 16,
  },
});
