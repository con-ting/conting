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
    };
  };
  seatsData: Array<{
    seat_id: string;
    grade_price: number;
  }>;
  showID: string;
};

export default function SeatSum(props: SeatSumProps) {
  const navigation = useNavigation();
  // const userInfo = useRecoilValue(userInfoState);
  // const userID = userInfo ? userInfo.user_id : null;

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

  // const handleBuyTicketPress = async () => {

  //   const merchantUid = `order_${uuid.v4()}`; // UUID로 주문번호 생성
  //   const totalPrice = calTotalPrice();
  //   const seatIds = Object.values(props.selectedSeats).map(seat => parseInt(seat.seatId)); // seatId를 숫자 배열로 변환

  //   const verificationData = {
  //     seat_list: seatIds,
  //     merchant_uid: merchantUid,
  //     amount: totalPrice,
  //     buyer_id: userID,
  //   };

  //   try {
  //     const response = await orderBeforeApi(verificationData);
  //     if  (response.result){
  //       // 성공적인 사전 검증 후 처리
  //       navigation.navigate('Pay', {
  //         resData: verificationData, selectedSeats: props.selectedSeats, showID: props.showID
  //       });

  //     }
  //   } catch (error) {
  //     // 사전 검증 실패 처리
  //     alert('티켓 구매를 위한 검증에 실패했습니다.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View>
        <Text style={F_SIZE_TITLE}>합계</Text>
        <Text style={F_SIZE_Y_HEADER}>{calTotalPrice()} 원</Text>
      </View>
      <YellowButton
        onPress={() => {
          navigation.navigate('Pay', {
            // resData: verificationData,
            selectedSeats: props.selectedSeats,
            showID: props.showID,
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
