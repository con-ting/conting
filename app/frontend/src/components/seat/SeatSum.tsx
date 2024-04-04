import {StyleSheet, Text, View} from 'react-native';
// import seatsData from '../data/seatsData';
import {F_SIZE_TITLE, F_SIZE_Y_HEADER} from '../../config/Font';
import {YellowButton} from '../button/Button';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {orderBeforeApi} from '../../api/order/order';
import uuid from 'react-native-uuid';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../../utils/recoil/Atoms';

type SeatSumProps = {
  selectedSeats: {
    [key: string]: {
      seatId: string;
      seatRow: string;
      seatCol: string;
      userName: string;
      memberId: string;
      owner_id: string;
      onwer_wallet: string;
      owner_fingerprint_key: string;
    };
  };
  seatsData: Array<{
    seat_id: string;
    grade_price: number;
  }>;
  scheduleID: string;
  showID: string;
  biometricKey: string;
};

export default function SeatSum(props: SeatSumProps) {
  const navigation = useNavigation();
  // const userInfo = useRecoilValue(userInfoState);
  // const userID = userInfo ? userInfo.user_id : null;

  useEffect(() => {
    console.log('에', props.selectedSeats);
  }, []);

  const calTotalPrice = () => {
    return Object.values(props.selectedSeats).reduce((total, {seatId}) => {
      const seat = props.seatsData.find(s => s.seat_id === seatId);
      return total + (seat ? seat.grade_price : 0);
    }, 0);
  };

  // 선택한 좌석이 없다면 렌더링 하지 않음
  if (Object.keys(props.selectedSeats).length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={F_SIZE_TITLE}>합계</Text>
        <Text style={F_SIZE_Y_HEADER}>{calTotalPrice()} 원</Text>
      </View>
      <YellowButton
        onPress={() => {
          navigation.navigate('Pay', {
            selectedSeats: props.selectedSeats,
            showID: props.showID,
            scheduleID: props.scheduleID,
            biometricKey: props.biometricKey,
          });
        }}
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
