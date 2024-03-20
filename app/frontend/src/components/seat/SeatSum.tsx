import {StyleSheet, Text, View} from 'react-native';
import seatsData from '../data/seatsData';
import {F_SIZE_TITLE, F_SIZE_Y_HEADER} from '../../config/Font';
import {YellowButton} from '../button/Button';
import {useNavigation} from '@react-navigation/native';

type SeatSumProps = {
  selectedSeats: Array<string>;
  seatsData: Array<{
    id: string;
    price: number;
  }>;
};

export default function SeatSum(props: SeatSumProps) {
  const navigation = useNavigation();

  const calTotalPrice = () => {
    return props.selectedSeats.reduce((total, seatId) => {
      const seat = props.seatsData.find(s => s.id === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);
  };

  // 선택한 좌석이 없다면 렌더링 하지 않음
  if (props.selectedSeats.length === 0) {
    return null;
  }

  const selectedSeatsInfo = props.selectedSeats
    .map(seatId => {
      const seat = props.seatsData.find(s => s.id === seatId);
      return seat ? {seat_id: seat.id, price: seat.price} : null;
    })
    .filter(info => info !== null); // 필터링하여 null 제거

  return (
    <View style={styles.container}>
      <View>
        <Text style={F_SIZE_TITLE}>합계</Text>
        <Text style={F_SIZE_Y_HEADER}>{calTotalPrice()} 원</Text>
      </View>
      <YellowButton
        onPress={() =>
          navigation.navigate('Pay', {selectedSeats: selectedSeatsInfo})
        }
        width={190}
        btnText="티켓 구매"
        textSize={20}
        isRadius
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
