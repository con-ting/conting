import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_TITLE} from '../../../../config/Font';
import {BasicConcertCardWide} from '../../../../components/card/ConcertCardWide';
import AlbumCard from '../../../../components/card/AlbumCard';
import {Dropdown} from '../../../../components/dropdown/Dropdown';
import {useState} from 'react';
import {widthPercent} from '../../../../config/Dimensions';

export default function CastActivityScreen() {
  // 드롭다운 오픈 상태
  const [dropDownOpen, setDropDownOpen] = useState(false);
  // 선택한 드롭다운 라벨
  const [selectedDrop, setSelectedDrop] = useState(null);

  const handleItemSelect = selectedValue => {
    setSelectedDrop(selectedValue);
  };

  const drops = [
    {label: '예매일순', value: '예매일순'},
    {label: '공연일순', value: '공연일순'},
  ];

  return (
    <View style={styles.container}>
      <Text style={[F_SIZE_TITLE, styles.title]}>출연한 콘서트</Text>
      <View style={styles.drop}>
        <Dropdown
          data={drops}
          width={widthPercent(120)}
          textSize={14}
          placeholder="정렬옵션"
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          onSelectValue={handleItemSelect}
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
      <Text style={[F_SIZE_TITLE, styles.title]}>발매한 앨범</Text>
      <View style={styles.card}>
        <AlbumCard
          name="The Winning"
          album="https://cdnimg.melon.co.kr/resource/image/cds/musicstory/imgUrl20240226030142472.jpg/melon/optimize/90"
          published_at="2024.02.20"
          songNums={10}
        />
        <AlbumCard
          name="IU 5th Album ‘LILAC’"
          album="https://cdnimg.melon.co.kr/resource/image/cds/musicstory/imgUrl20240226030142472.jpg/melon/optimize/90"
          published_at="2021.03.25"
          songNums={10}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    // marginBottom: 30,
  },
  title: {
    marginTop: 15,
  },
  drop: {
    marginTop: 15,
  },

  card: {
    marginTop: 15,
  },
});
