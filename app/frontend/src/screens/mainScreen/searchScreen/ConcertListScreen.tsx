import {StyleSheet, Text, View} from 'react-native';
import {MAINBLACK} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import {BasicConcertCardWide} from '../../../components/card/ConcertCardWide';

export default function ConcertListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <BasicConcertCardWide
          onPress={() => console.log('히히')}
          disabled={true}
          title={'우디(Woody)의 映花fefefefeafdfasvawevasvasdvasdv'}
          img_url={
            'http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/24/02/0400012402_199945_01.116.gif'
          }
          img_tag={'예매 예정'}
          sido={'서울'}
          concert_hall={
            '신한카드 SOL페이 스퀘어 홀 한글한글한글한글ㅇ리암러ㅣㅇㅁㄴ;ㅏㄹ이박무창a'
          }
          date_tag={'예매시작일'}
          date={'2024.07.05'}
          swipe_btn_disabled={true}
        />
      </View>
      <View style={styles.card}>
        <BasicConcertCardWide
          onPress={() => console.log('히히')}
          disabled={true}
          title={'우디(Woody)의 映花fefefefeafdfasvawevasvasdvasdv'}
          img_url={
            'http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/24/02/0400012402_199945_01.116.gif'
          }
          img_tag={'예매 예정'}
          sido={'서울'}
          concert_hall={
            '신한카드 SOL페이 스퀘어 홀 한글한글한글한글ㅇ리암러ㅣㅇㅁㄴ;ㅏㄹ이박무창a'
          }
          date_tag={'예매시작일'}
          date={'2024.07.05'}
          swipe_btn_disabled={true}
        />
      </View>
      <View style={styles.card}>
        <BasicConcertCardWide
          onPress={() => console.log('히히')}
          disabled={true}
          title={'우디(Woody)의 映花fefefefeafdfasvawevasvasdvasdv'}
          img_url={
            'http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/24/02/0400012402_199945_01.116.gif'
          }
          img_tag={'예매 예정'}
          sido={'서울'}
          concert_hall={
            '신한카드 SOL페이 스퀘어 홀 한글한글한글한글ㅇ리암러ㅣㅇㅁㄴ;ㅏㄹ이박무창a'
          }
          date_tag={'예매시작일'}
          date={'2024.07.05'}
          swipe_btn_disabled={true}
        />
      </View>
      <View style={styles.card}>
        <BasicConcertCardWide
          onPress={() => console.log('히히')}
          disabled={true}
          title={'우디(Woody)의 映花fefefefeafdfasvawevasvasdvasdv'}
          img_url={
            'http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/24/02/0400012402_199945_01.116.gif'
          }
          img_tag={'예매 예정'}
          sido={'서울'}
          concert_hall={
            '신한카드 SOL페이 스퀘어 홀 한글한글한글한글ㅇ리암러ㅣㅇㅁㄴ;ㅏㄹ이박무창a'
          }
          date_tag={'예매시작일'}
          date={'2024.07.05'}
          swipe_btn_disabled={true}
        />
      </View>
      <View style={styles.card}>
        <BasicConcertCardWide
          onPress={() => console.log('히히')}
          disabled={true}
          title={'우디(Woody)의 映花fefefefeafdfasvawevasvasdvasdv'}
          img_url={
            'http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/24/02/0400012402_199945_01.116.gif'
          }
          img_tag={'예매 예정'}
          sido={'서울'}
          concert_hall={
            '신한카드 SOL페이 스퀘어 홀 한글한글한글한글ㅇ리암러ㅣㅇㅁㄴ;ㅏㄹ이박무창a'
          }
          date_tag={'예매시작일'}
          date={'2024.07.05'}
          swipe_btn_disabled={true}
        />
      </View>
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
