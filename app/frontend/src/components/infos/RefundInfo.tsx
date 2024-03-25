import {StyleSheet, Text, View} from 'react-native';
import {BasicConcertCardWide} from '../card/ConcertCardWide';
import {
  F_SIZE_BBIGTEXT,
  F_SIZE_BIGTEXT,
  F_SIZE_HEADER,
  F_SIZE_SUBTITLE,
  F_SIZE_TEXT,
  F_SIZE_TITLE,
  F_SIZE_Y_BUTTON,
  F_SIZE_Y_HEADER,
  F_SIZE_Y_TITLE,
} from '../../config/Font';
import {YellowButton} from '../button/Button';
import {useNavigation} from '@react-navigation/native';

export default function RefundInfo() {
  const navigation = useNavigation();
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
      <Text style={[F_SIZE_HEADER, styles.header]}>구매 정보</Text>
      <View style={styles.titles}>
        <Text style={F_SIZE_SUBTITLE}>입장 권한</Text>
        <Text style={[F_SIZE_SUBTITLE, styles.seat]}>좌석 번호</Text>
        <Text style={F_SIZE_SUBTITLE}>티켓 가격</Text>
      </View>
      <View style={styles.titles}>
        <View style={styles.entry}>
          <Text style={F_SIZE_BIGTEXT}>김싸피</Text>
        </View>
        <Text style={F_SIZE_BIGTEXT}>7</Text>
        <Text style={F_SIZE_BIGTEXT}>99,000</Text>
      </View>
      <View style={styles.titles}>
        <View style={styles.entry}>
          <Text style={F_SIZE_BIGTEXT}>김싸피</Text>
        </View>
        <Text style={F_SIZE_BIGTEXT}>8</Text>
        <Text style={F_SIZE_BIGTEXT}>99,000</Text>
      </View>
      <View style={styles.titles}>
        <View style={styles.entry}>
          <Text style={F_SIZE_BIGTEXT}>김싸피</Text>
        </View>
        <Text style={F_SIZE_BIGTEXT}>9</Text>
        <Text style={F_SIZE_BIGTEXT}>99,000</Text>
      </View>
      <View style={styles.line} />
      <View>
        <Text style={[F_SIZE_HEADER, styles.header]}>취소 수수료</Text>
        <View style={styles.standard}>
          <Text style={F_SIZE_Y_BUTTON}>예매일 기준</Text>
        </View>
        <View style={styles.standardContext}>
          <Text style={F_SIZE_BBIGTEXT}>예매 후 7일 이내</Text>
          <Text style={F_SIZE_BBIGTEXT}>없음</Text>
        </View>
        <View style={styles.standardContext}>
          <Text style={F_SIZE_BBIGTEXT}>예매 후 10일 이내</Text>
          <Text style={F_SIZE_BBIGTEXT}>장당 4,000원 (10% 한도)</Text>
        </View>
        <View style={styles.standard}>
          <Text style={F_SIZE_Y_BUTTON}>관람일 기준</Text>
        </View>
        <View style={styles.standardContext}>
          <Text style={F_SIZE_BBIGTEXT}>관람일 9일전</Text>
          <Text style={F_SIZE_BBIGTEXT}>10%</Text>
        </View>
        <View style={styles.standardContext}>
          <Text style={F_SIZE_BBIGTEXT}>관람일 6일전</Text>
          <Text style={F_SIZE_BBIGTEXT}>20%</Text>
        </View>
        <View style={styles.standardContext}>
          <Text style={F_SIZE_BBIGTEXT}>관람일 2일전</Text>
          <Text style={F_SIZE_BBIGTEXT}>30%</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View>
        <Text style={[F_SIZE_HEADER, styles.header]}>결제 요약</Text>

        <View style={styles.standardContext}>
          <Text style={F_SIZE_TITLE}>좌석 번호</Text>
          <Text style={F_SIZE_TITLE}>7, 8, 9</Text>
        </View>
        <View style={styles.standardContext}>
          <Text style={F_SIZE_TITLE}>구매 수량</Text>
          <Text style={F_SIZE_TITLE}>3</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.header}>
        <Text style={F_SIZE_HEADER}>총액</Text>
        <Text style={F_SIZE_Y_HEADER}>297,000 원</Text>
      </View>
      <YellowButton
        onPress={() => navigation.navigate('ResultRefund')}
        btnText="환불하기"
        textSize={20}
        isRadius
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
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
  standard: {
    alignItems: 'center',

    // justifyContent: 'center',
  },
  standardContext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
  },
});
