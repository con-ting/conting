import {FlatList, StyleSheet, View} from 'react-native';
import ConcertCard from '../../../components/card/ConcertCard';
import {BasicConcertCardWide} from '../../../components/card/ConcertCardWide';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface concertProps {
  poster: string;
  title: string;
  address: string;
  date: string;
}

export default function TicketCheckScreen() {
  const navigation = useNavigation()
  const concertList = [
    {
      show_id: 2,
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxNzEwMTFfMjY3%2FMDAxNTA3NzIzNjU0MjM1.kTHfzzQ5oZEEl0cUUpEwsklfZq_HhzfOckVtOspfVwEg._0FoK4KQ6_eqwt7vRGVLNcZ90leatv1A_QiPL7mD-Cgg.JPEG.yun1202%2FexternalFile.jpg&type=a340',
      title: '아이유 콘서트',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 3,
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMjdfNDAg%2FMDAxNzA5MDAyNzcyNjkz.WDAo2Onr02R_VYBwY1biISc9F534ufC9TpUbzsWzYeIg.G6Qq_-fvzXSbUKmoSjgcmiAsAuA2DX_7jcBUskT_5bog.JPEG%2FIMG_5589.jpg&type=a340',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 4,
      poster:
        'https://shopping-phinf.pstatic.net/main_4466065/44660653345.1.jpg?type=f300',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 5,
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231213_263%2F1702439479789j6cid_JPEG%2F269_image_url_1702439479766.jpg',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 6,
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODExMTlfOTgg%2FMDAxNTQyNjE0ODMwMzY0.yvRdj5mecR1HfyCf-ND24sGy4Nvwoao4BKu9kV97y60g.r2LZzxYHnBWEtgkMGWSNPq8SbM0Cmf8uRviYXpPqCZUg.JPEG.dmsejrl1%2F6.jpg&type=a340',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 7,
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240219_172%2F17083253988697c6a1_JPEG%2F269_33689747_image_url_1708325398852.jpg',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      show_id: 8,
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240131_125%2F1706681961365GvH5L_PNG%2F269_image_url_1706681961328.png',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
  ];
  const renderItem = ({item, index}: {item: concertProps; index: number}) => (
    <TouchableOpacity style={{marginBottom: 20}} onPress={()=>navigation.navigate('Camera')}>
      <BasicConcertCardWide
        onPress={() => console.log('히히')}
        disabled={true}
        img_tag_disabled={true}
        title={item.title}
        img_url={item.poster}
        img_tag={'예매 예정'}
        sido={'서울'}
        concert_hall={item.address}
        date_tag={'예매시작일'}
        date={item.date}
        swipe_btn_disabled={true}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={concertList}
        renderItem={renderItem}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
