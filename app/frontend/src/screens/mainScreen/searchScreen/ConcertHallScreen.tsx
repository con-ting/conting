import {StyleSheet, Text, View} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import ConcertHallCard from '../../../components/card/ConcertHallCard';

export default function ConcertHallScreen({halls}) {
  return (
    <View style={styles.container}>
      {halls.map(hall => (
        <View style={styles.cards}>
          <ConcertHallCard
            title={hall.name}
            seat={hall.total_seat_count}
            address={hall.address}
          />
        </View>
      ))}
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
