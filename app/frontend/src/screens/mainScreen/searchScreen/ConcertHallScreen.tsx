import {StyleSheet, Text, View} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import ConcertHallCard from '../../../components/card/ConcertHallCard';
import {useNavigation} from '@react-navigation/native';

export default function ConcertHallScreen({halls}: any) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {halls.map(
        (hall: {name: string; total_seat_count: number; address: string}) => (
          <View style={styles.cards}>
            <ConcertHallCard
              onPress={() => console.log('공연홀보기로 이동')}
              title={hall.name}
              seat={hall.total_seat_count}
              address={hall.address}
            />
          </View>
        ),
      )}
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
