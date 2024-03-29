import {StyleSheet, Text, View} from 'react-native';
import {MAINBLACK, MINTBASE} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import {BasicConcertCardWide} from '../../../components/card/ConcertCardWide';
import formatSido from '../../../utils/common/SidoFormat';

const formatDateWithTime = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const weekDay = date.toLocaleString('ko-KR', {weekday: 'short'}); // 'ko-KR' 로케일의 요일 약어
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${year}.${month}.${day}(${weekDay}) ${hours}:${minutes}`;
};

export default function ConcertListScreen({concerts}) {
  return (
    <View style={styles.container}>
      {concerts.map(concert => (
        <View style={styles.card} key={concert.show_id}>
          <BasicConcertCardWide
            onPress={() => console.log('히히')}
            disabled={concert.status !== 'on_sale'}
            title={concert.title}
            img_url={concert.poster}
            img_tag={
              concert.reservation_type === 'F' ? '선착순 예매중' : '추첨 예매중'
            }
            img_tag_disabled={false}
            img_tag_color={concert.status === 'on_sale' ? MINTBASE : ''}
            sido={formatSido(concert.hall_address)}
            concert_hall={concert.hall_name}
            date_tag={'예매일'}
            date={formatDateWithTime(concert.reservation_start_date_time)}
            swipe_btn_disabled={concert.status !== 'on_sale'}
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
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
});
