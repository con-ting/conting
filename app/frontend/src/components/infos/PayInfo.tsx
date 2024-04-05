import {Modal, StyleSheet, Text, View} from 'react-native';
import {
  F_SIZE_BIGTEXT,
  F_SIZE_SUBTITLE,
  F_SIZE_TITLE,
  F_SIZE_Y_TITLE,
} from '../../config/Font';
import {BasicConcertCardWide} from '../card/ConcertCardWide';
import {YellowButton} from '../button/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';

import IMP from 'iamport-react-native';
import Loading from '../loader/Loading';
import WebView from 'react-native-webview';
import formatSido from '../../utils/common/SidoFormat';
import {orderAfterApi, orderFailApi} from '../../api/order/order';
import {widthPercent} from '../../config/Dimensions';

export default function PayInfo({
  selectedSeats,
  concert,
  showID,
  scheduleID,
  buyID,
  biometricKey,
}) {
  const navigation = useNavigation();

  // 주문 번호 상태와 생성 로직
  const [orderID, setOrderID] = useState('');

  const [isPaying, setIsPaying] = useState(false);
  useEffect(() => {
    console.log('selectedSeats', selectedSeats);

    console.log('바이아이디', buyID);
    console.log('콘서트정보', concert);
    // 주문 번호 생성 : 랜덤 숫자 6자리
    const randomNumbers = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(6, '0'); // 6자리 랜덤 숫자
    const newOrderID = `ORD-${randomNumbers}`;
    setOrderID(newOrderID);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행됨

  // 총액 계산
  const totalAmount = Object.values(selectedSeats).reduce(
    (sum, {gradePrice}) => sum + gradePrice,
    0,
  );

  // 결제 데에터
  const paymentData = {
    pg: 'tosspay.tosstest',
    pay_method: 'card',
    name: '콘서트 티켓 결제',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: totalAmount,
    buyer_name: '김싸피',
    buyer_id: buyID,
    buyer_tel: '01012345678',
    buyer_email: 'example@naver.com',
    buyer_addr: '서울시 강남구 신사동 661-16',
    buyer_postcode: '06018',
    app_scheme: 'example',
  };

  function startPayment() {
    setIsPaying(true);
  }

  function closePayment() {
    setIsPaying(false);
  }

  async function handlePaymentResult(response: {
    imp_success: boolean;
    imp_uid: any;
    merchant_uid: any;
  }) {
    // 결제 결과 콜백 시작 지점에 로그 찍기
    console.log('Payment Result Callback Fired', response);

    setIsPaying(false);
    if (response.imp_success) {
      // 결제 성공 로그
      console.log('Payment Success', response);
      // 결제 성공 시 사후 검증 API 호출
      try {
        const verificationParams = {
          amount: paymentData.amount,
          buyer_id: paymentData.buyer_id,
          imp_uid: response.imp_uid, // 아임포트 결제 번호
          merchant_uid: response.merchant_uid, // 자체 결제 번호
          seat_ids: Object.values(selectedSeats).map(seat => seat.seatId), // 구매한 좌석 ID 배열
          ticket_list: Object.values(selectedSeats).map(seat => ({
            // 티켓 리스트 데이터 구성

            seat_id: seat.seatId,
            schedule_id: scheduleID,
            price: seat.gradePrice,
            owner_id: seat.owner_id,
            finger_print: seat.owner_fingerprint_key, // 소유자 지문, 이 예제에서는 biometricKey를 사용
            nft_url: seat.owner_wallet,
            row: seat.seatRow,
            col: seat.seatCol,
          })),
        };
        const verificationResult = await orderAfterApi(verificationParams);
        console.log('Verification Result:', verificationResult);
        if (verificationResult) {
          // 검증 성공 후 처리 로직, 결과 페이지로 이동
          navigation.replace('Result', {paySuccess: true});
        }
      } catch (error) {
        console.error('Verification Failed:', error);
        // 검증 실패 시 처리 로직, 오류 메시지 표시
        alert('결제 검증에 실패했습니다.');
      }
    } else {
      // 결제 실패 로그
      console.error('Payment Failed', response);
      // 결제 실패 시 처리 로직
      try {
        // 결제 실패 시 보내야 할 데이터 구조에 맞추어 ticket_list 배열 구성
        const failParams = {
          ticket_list: Object.values(selectedSeats).map(seat => ({
            seat_id: seat.seatId,
            schedule_id: scheduleID, // 현재 콘서트의 회차 ID
            price: seat.gradePrice,
            owner_id: seat.owner_id, // 결제 데이터에서 buyer_id 사용
            finger_print: seat.owner_fingerprint_key, // 해당 좌석의 소유자 지문 정보
            nft_url: seat.owner_wallet,
            row: seat.seatRow,
            col: seat.seatCol,
          })),
        };
        const failResult = await orderFailApi(failParams);
        console.log('Fail Result:', failResult);
        // 실패 처리 후 로직, 예를 들어 오류 메시지 표시나 다른 화면으로 이동
        navigation.replace('Result', {paySuccess: false});
      } catch (error) {
        console.error('Fail Handling Failed:', error);
        // 실패 처리 로직 실패 시, 예를 들어 오류 메시지 표시
        alert('결제 실패 처리에 문제가 발생했습니다.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <BasicConcertCardWide
        title={concert.show.title}
        disabled
        img_url={concert.show.poster}
        img_tag_disabled
        sido={formatSido(concert.hall.address)}
        concert_hall={concert.hall.name}
        date_tag="관람 예정일"
        date={concert.show.start_date}
        swipe_btn_disabled
      />
      <Text style={[F_SIZE_TITLE, styles.header]}>구매 정보</Text>
      <View style={styles.titles}>
        <Text style={F_SIZE_SUBTITLE}>입장 권한</Text>
        <Text style={[F_SIZE_SUBTITLE, styles.seat]}>좌석 번호</Text>
        <Text style={F_SIZE_SUBTITLE}>티켓 가격</Text>
      </View>

      {Object.values(selectedSeats).map((seat, index) => (
        <View key={index} style={styles.titles}>
          <View style={styles.entry}>
            <Text style={F_SIZE_BIGTEXT}>{seat.userName}</Text>
            {/* <Text style={F_SIZE_BIGTEXT}>{buyer.email}</Text> */}
          </View>
          <Text style={F_SIZE_BIGTEXT}>{seat.seatId}</Text>
          <Text style={F_SIZE_BIGTEXT}>{seat.gradePrice.toLocaleString()}</Text>
        </View>
      ))}
      <View style={styles.line} />
      <View>
        <Text style={[F_SIZE_TITLE, styles.header]}>결제 요약</Text>

        <View style={styles.titles}>
          <Text style={F_SIZE_SUBTITLE}>Order ID</Text>
          <Text style={F_SIZE_SUBTITLE}>{orderID}</Text>
        </View>
        <View style={styles.titles}>
          <Text style={F_SIZE_SUBTITLE}>구매 수량</Text>
          <Text style={F_SIZE_SUBTITLE}>
            {Object.values(selectedSeats).length}
          </Text>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.header}>
        <Text style={F_SIZE_TITLE}>총액</Text>
        <Text style={F_SIZE_Y_TITLE}>{totalAmount.toLocaleString()} 원</Text>
      </View>
      <YellowButton
        onPress={startPayment}
        btnText="결제하기"
        isRadius
        textSize={20}
      />
      <Modal
        visible={isPaying}
        onRequestClose={closePayment}
        animationType="slide">
        <View style={styles.modalContent}>
          <IMP.Payment
            userCode="imp13658303" // 실제 가맹점 식별코드로 변경
            data={paymentData}
            callback={handlePaymentResult}
            loading={<Loading />}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {margin: 10},
  modalContent: {flex: 1},
  header: {
    marginTop: 30,
    marginLeft: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titles: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  entry: {
    flexDirection: 'row',
    width: widthPercent(60),
  },
  name: {
    marginLeft: 2,
  },

  line: {
    borderBottomColor: '#595959',
    borderBottomWidth: 1,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
