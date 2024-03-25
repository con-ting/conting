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

const userName = '김싸피';

export default function PayInfo() {
  const route = useRoute();
  const {selectedSeats} = route.params;

  const navigation = useNavigation();

  // 주문 번호 상태와 생성 로직
  const [orderID, setOrderID] = useState('');

  const [isPaying, setIsPaying] = useState(false);
  useEffect(() => {
    // 주문 번호 생성 : 랜덤 숫자 6자리
    const randomNumbers = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(6, '0'); // 6자리 랜덤 숫자
    const newOrderID = `ORD-${randomNumbers}`;
    setOrderID(newOrderID);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행됨

  // 총액 계산
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // 결제 데에터
  const paymentData = {
    pg: 'kakaopay.TC0ONETIME',
    pay_method: 'card',
    name: '콘서트 티켓 결제',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: totalAmount,
    buyer_name: userName,
    buyer_tel: '01091250545',
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

  function handlePaymentResult(response) {
    const {success, merchant_id, error_msg} = response;
    setIsPaying(false);
    navigation.replace('Result', response);

    // console.log(response);
    // 결제 페이지 렌더링 시 조건
    // if (success) {
    //   alert('결제 성공');
    //   console.log(success);
    //   setIsPaying(false);
    //   navigation.replace('Result', response);
    // } else {
    //   alert(`결제 실패 : $(error_msg)`);
    // }
  }

  return (
    <View style={styles.container}>
      <BasicConcertCardWide
        title="2024 IU HER WORLD TOUR CONCERT IN SEOUL"
        disabled
        img_url="https://t1.daumcdn.net/cafeattach/1I7Yc/c8ae6ddb037b3ffac2575a0f6c2bd1a933f49584_re_1705505439515"
        img_tag_disabled
        sido="서울"
        concert_hall="KSPO DOMEi"
        date_tag="관람 예정일"
        date="2024.03.20"
        swipe_btn_disabled
      />
      <Text style={[F_SIZE_TITLE, styles.header]}>구매 정보</Text>
      <View style={styles.titles}>
        <Text style={F_SIZE_SUBTITLE}>입장 권한</Text>
        <Text style={[F_SIZE_SUBTITLE, styles.seat]}>좌석 번호</Text>
        <Text style={F_SIZE_SUBTITLE}>티켓 가격</Text>
      </View>

      {selectedSeats.map((seat, index) => (
        <View key={index} style={styles.titles}>
          <View style={styles.entry}>
            <Text style={F_SIZE_BIGTEXT}>{userName}</Text>
            {/* <Text style={F_SIZE_BIGTEXT}>{buyer.email}</Text> */}
          </View>
          <Text style={F_SIZE_BIGTEXT}>{seat.seat_id}</Text>
          <Text style={F_SIZE_BIGTEXT}>{seat.price.toLocaleString()}</Text>
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
          <Text style={F_SIZE_SUBTITLE}>{selectedSeats.length}</Text>
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
