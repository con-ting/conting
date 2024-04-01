import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {F_SIZE_BIGTEXT} from '../../../config/Font';
import {MAINBLACK} from '../../../config/Color';
import PayInfo from '../../../components/infos/PayInfo';
import {useEffect, useState} from 'react';
import {ConcertDetailApi} from '../../../api/concert/concert';

export default function PaymentScreen({route}) {
  const selectedSeats = route.params.selectedSeats;
  // const showID = route.params.showID;
  const [concertDetail, setConcertDetail] = useState(null);

  useEffect(() => {
    console.log('받아', selectedSeats);
    console.log(route);
    console.log('shs', showID);
    fetchConcert(route.params.showID);
  });

  const fetchConcert = async (showID: string) => {
    console.log('공연 API 요청:', {show_id: showID});
    try {
      const response = await ConcertDetailApi(showID);
      console.log('공연 API 응답: ', response);
      setConcertDetail(response);
    } catch (error) {
      console.error('공연 API 호출 중 오류 발생: ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PayInfo selectedSeats={selectedSeats} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
