import {StyleSheet, Text, View} from 'react-native';
import {BasicConcertCardWide} from '../card/ConcertCardWide';
import {
  F_SIZE_BBIGTEXT,
  F_SIZE_BIGTEXT,
  F_SIZE_HEADER,
  F_SIZE_SUBTITLE,
  F_SIZE_TITLE,
  F_SIZE_Y_BUTTON,
  F_SIZE_Y_HEADER,
} from '../../config/Font';
import {YellowButton} from '../button/Button';
import {useNavigation} from '@react-navigation/native';
import formatSido from '../../utils/common/SidoFormat';
import {formatDateWithDay} from '../../utils/common/TimeFormat';
import {
  accessImApi,
  fetchAccessToken,
  refundApi,
  refundImApi,
} from '../../api/ticket/order';
import {useEffect} from 'react';

export default function RefundInfo({refund}) {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('환불페이지 진입');
  });

  const handleRefund = async () => {
    try {
      const response = await refundApi(refund.ticket_id);
      if (response.result) {
        navigation.navigate('ResultRefund', {refundResult: true});
      } else {
        navigation.navigate('ResultRefund', {refundResult: false});
      }
    } catch (error) {
      console.error('환불 처리 중 오류 발생:', error);
      alert('환불 오류: 환불 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <BasicConcertCardWide
        title={refund.title}
        disabled
        img_url={refund.img}
        img_tag_disabled
        sido={formatSido(refund.hall_location)}
        concert_hall={refund.hall_name}
        date_tag="관람 예정일"
        date={formatDateWithDay(refund.start_date)}
        swipe_btn_disabled
      />
      <Text style={[F_SIZE_HEADER, styles.header]}>구매 정보</Text>
      <View style={styles.titles}>
        {/* <Text style={F_SIZE_SUBTITLE}>입장 권한</Text> */}
        <Text style={F_SIZE_SUBTITLE}>티켓 아이디</Text>
        <Text style={[F_SIZE_SUBTITLE, styles.seat]}>좌석 번호</Text>
        <Text style={F_SIZE_SUBTITLE}>티켓 가격</Text>
      </View>
      <View style={styles.titles}>
        <View style={styles.entry}>
          <Text style={F_SIZE_BIGTEXT}>{refund.ticket_id}</Text>
        </View>
        <Text style={F_SIZE_BIGTEXT}>7</Text>
        <Text style={F_SIZE_BIGTEXT}>{refund.price}</Text>
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
        onPress={() => handleRefund()}
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
function alert(arg0: string, arg1: any) {
  throw new Error('Function not implemented.');
}
