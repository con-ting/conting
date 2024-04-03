import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {F_SIZE_BIGTEXT} from '../../../config/Font';
import {MAINBLACK} from '../../../config/Color';
import PayInfo from '../../../components/infos/PayInfo';
import {useEffect, useState} from 'react';
import {ConcertDetailApi} from '../../../api/catalog/concert';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../../../utils/recoil/Atoms';

export default function PaymentScreen({route}) {
  const selectedSeats = route.params.selectedSeats;
  const showID = route.params.showID;
  const scheduleID = route.params.scheduleID;
  const biometricKey = route.params.biometricKey;
  // const buyID = route.params.resData.buyer_id;
  const userInfo = useRecoilValue(userInfoState);
  const userID = userInfo ? userInfo.user_id : null;
  const [concertDetail, setConcertDetail] = useState(null);

  useEffect(() => {
    console.log('받아', selectedSeats);
    // console.log(route);
    console.log('결제페이지 입장 ', route);
    // console.log('shs', route.params.showID);
    fetchConcert(route.params.showID);
  }, []);

  const fetchConcert = async (showID: string) => {
    console.log('공연 API 요청:', {show_id: showID});
    try {
      const response = await ConcertDetailApi(showID);
      console.log('공연 API 응답: ', response);
      setConcertDetail(response);
      // console.log('콪어', concertDetail);
    } catch (error) {
      console.error('공연 API 호출 중 오류 발생: ', error);
    }
  };

  if (concertDetail === null) {
    return <Text>...로딩</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <PayInfo
        selectedSeats={selectedSeats}
        concert={concertDetail}
        showID={showID}
        scheduleID={scheduleID}
        biometricKey={biometricKey}
        buyID={selectedSeats.memberId}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
});
