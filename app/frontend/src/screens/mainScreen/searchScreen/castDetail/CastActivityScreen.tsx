import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_TITLE} from '../../../../config/Font';
import {BasicConcertCardWide} from '../../../../components/card/ConcertCardWide';
import AlbumCard from '../../../../components/card/AlbumCard';
import {Dropdown} from '../../../../components/dropdown/Dropdown';
import {Key, useState} from 'react';
import {widthPercent} from '../../../../config/Dimensions';
import { useNavigation } from '@react-navigation/native';
import { MINTBASE } from '../../../../config/Color';
import formatSido from '../../../../utils/common/SidoFormat';

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

export default function CastActivityScreen({albums, concerts}) {
  const navigation = useNavigation();
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
      
      {concerts.map(
        (concert: {
          show_id: Key | null | undefined;
          status: string;
          title: string;
          poster: string;
          reservation_type: string;
          hall_address: string;
          hall_name: string;
          reservation_start_date_time: any;
        }) => (
          <View key={concert.show_id}>
            <Text style={[F_SIZE_TITLE, styles.title]}>출연한 콘서트</Text>
            <View style={styles.card}>
            <BasicConcertCardWide
              onPress={() =>
                navigation.navigate('ConcertDetail', {
                  showID: concert.show_id,
                })
              }
              disabled={concert.status !== 'on_sale'}
              title={concert.title}
              img_url={concert.poster}
              img_tag={
                concert.reservation_type === 'F'
                  ? '선착순 예매중'
                  : '추첨 예매중'
              }
              img_tag_disabled={false}
              img_tag_color={concert.status === 'on_sale' ? MINTBASE : ''}
              sido={formatSido(concert.hall_address)}
              concert_hall={concert.hall_name}
              date_tag={'예매일'}
              date={formatDateWithTime(concert.reservation_start_date_time)}
              // swipe_btn_disabled={concert.status !== 'on_sale'}
              swipe_btn_disabled
            />
            </View>
          </View>
        ),
      )}
      
      <Text style={[F_SIZE_TITLE, styles.title]}>발매한 앨범</Text>
      <View style={styles.card}>
        {albums.map((album: { title: string; image: string; published_at: string | undefined; }, index: Key | null | undefined) => (
        <AlbumCard
        key={index}
          name={album.title}
          album={album.image}
          published_at={album.published_at}
          songNums={10} //데이터 없음
        />
        ))}
        
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
