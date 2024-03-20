import {StyleSheet, Text, View} from 'react-native';
import {
  F_SIZE_BIGTEXT,
  F_SIZE_HEADER,
  F_SIZE_TITLE,
  F_SIZE_Y_HEADER,
  F_SIZE_Y_TITLE,
} from '../../config/Font';
import {BasicConcertCardWide} from '../card/ConcertCardWide';
import {YellowButton} from '../button/Button';
import {MAINGRAY} from '../../config/Color';
import {widthPercent} from '../../config/Dimensions';
import {useRoute} from '@react-navigation/native';

const payData = {
  buyer: [
    {name: '김싸피', email: 'ssafy@ssafy.com', seat_id: '스탠딩', price: 99000},
    {
      name: '김두피',
      email: 'ssafy2@ssafy.com',
      seat_id: 'VIP-8',
      price: 199000,
    },
    {
      name: '김세피',
      email: 'ssafy3@ssafy.com',
      seat_id: 'VIP-9',
      price: 199000,
    },
  ],
};

export default function PayInfo() {
  const route = useRoute();
  const {selectedSeats} = route.params;

  // 총액 계산
  const totalAmout = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <View>
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
        <Text style={F_SIZE_TITLE}>입장 권한</Text>
        <Text style={[F_SIZE_TITLE, styles.seat]}>좌석 번호</Text>
        <Text style={F_SIZE_TITLE}>티켓 가격</Text>
      </View>

      {selectedSeats.map((seat, index) => (
        <View key={index} style={styles.infoContainer}>
          <View style={styles.entry}>
            <Text style={F_SIZE_BIGTEXT}>김싸피</Text>
            {/* <Text style={F_SIZE_BIGTEXT}>{buyer.email}</Text> */}
          </View>
          <Text style={F_SIZE_BIGTEXT}>{seat.seat_id}</Text>
          <Text style={F_SIZE_BIGTEXT}>{seat.price.toLocaleString()}</Text>
        </View>
      ))}
      <View style={styles.line} />
      <View>
        <Text style={[F_SIZE_TITLE, styles.header]}>결제 요약</Text>

        <View style={styles.infoContainer}>
          <Text style={F_SIZE_TITLE}>Order ID</Text>
          <Text style={F_SIZE_TITLE}>573982854</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={F_SIZE_TITLE}>구매 수량</Text>
          <Text style={F_SIZE_TITLE}>{selectedSeats.length}</Text>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.header}>
        <Text style={F_SIZE_TITLE}>총액</Text>
        <Text style={F_SIZE_Y_TITLE}>{totalAmout.toLocaleString()} 원</Text>
      </View>
      <YellowButton btnText="결제하기" isRadius textSize={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titles: {
    marginLeft: 5,
    marginRight: 5,
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
