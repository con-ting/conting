import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {MAINBLACK, MINTBASE} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import {BasicConcertCardWide} from '../../../components/card/ConcertCardWide';
import formatSido from '../../../utils/common/SidoFormat';
import {useNavigation} from '@react-navigation/native';
import {Key} from 'react';
import {heightPercent} from '../../../config/Dimensions';

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

export default function ConcertListScreen({concerts}: any) {
  const navigation = useNavigation();

  const renderItem = ({item: concert}) => (
    <View style={styles.cards}>
      <BasicConcertCardWide
        onPress={() =>
          // console.log('dpd?', concert.show_id)
          navigation.navigate('ConcertDetail', {show_id: concert.show_id})
        }
        disabled={concert.status !== 'on_sale'}
        title={concert.title}
        img_url={concert.poster}
        img_tag={
          concert.reservation_type === 'F' ? '선착순 예매중' : '추첨 예매중'
        }
        img_tag_disabled={false}
        img_tag_color={concert.status === 'on_sale' ? MINTBASE : ''} // MINTBASE를 '#00FF00'로 가정
        sido={formatSido(concert.hall_address)}
        concert_hall={concert.hall_name}
        date_tag={'예매일'}
        date={formatDateWithTime(concert.reservation_start_date_time)}
        // 다른 props 필요시 추가
        swipe_btn_disabled
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={concerts}
        renderItem={renderItem}
        keyExtractor={item => item.show_id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  cards: {
    marginTop: 10,
    marginBottom: 10,
  },
});
