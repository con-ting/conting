import {View, Text, StyleSheet} from 'react-native';
import ConcertHallCard from '../../components/card/ConcertHallCard';
import FisrtComeList from '../../components/list/FirstComeList';
import {ScrollView} from 'react-native';
import PopularConcertList from './../../components/list/PopularConcertList';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import BannerList from './../../components/list/BannerList';
import {widthPercent} from '../../config/Dimensions';
import EventList from '../../components/list/EventList';
import {SearchBar} from '../../components/searchBar/SearchBar';
import {CARDBASE} from '../../config/Color';
import {useNavigation} from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();
  const [backgroundColors, setBackgroundColors] = useState([
    '#000000',
    '#000000',
    '#000000',
  ]);
  const concertList = [
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxNzEwMTFfMjY3%2FMDAxNTA3NzIzNjU0MjM1.kTHfzzQ5oZEEl0cUUpEwsklfZq_HhzfOckVtOspfVwEg._0FoK4KQ6_eqwt7vRGVLNcZ90leatv1A_QiPL7mD-Cgg.JPEG.yun1202%2FexternalFile.jpg&type=a340',
      title: '아이유 콘서트',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMjdfNDAg%2FMDAxNzA5MDAyNzcyNjkz.WDAo2Onr02R_VYBwY1biISc9F534ufC9TpUbzsWzYeIg.G6Qq_-fvzXSbUKmoSjgcmiAsAuA2DX_7jcBUskT_5bog.JPEG%2FIMG_5589.jpg&type=a340',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      poster:
        'https://shopping-phinf.pstatic.net/main_4466065/44660653345.1.jpg?type=f300',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20231213_263%2F1702439479789j6cid_JPEG%2F269_image_url_1702439479766.jpg',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      poster:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODExMTlfOTgg%2FMDAxNTQyNjE0ODMwMzY0.yvRdj5mecR1HfyCf-ND24sGy4Nvwoao4BKu9kV97y60g.r2LZzxYHnBWEtgkMGWSNPq8SbM0Cmf8uRviYXpPqCZUg.JPEG.dmsejrl1%2F6.jpg&type=a340',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240219_172%2F17083253988697c6a1_JPEG%2F269_33689747_image_url_1708325398852.jpg',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
    {
      poster:
        'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240131_125%2F1706681961365GvH5L_PNG%2F269_image_url_1706681961328.png',
      title: '임영웅 콘서트 IM HERO TOUR 2023',
      address: '서울•킨텍스 1전시장',
      date: '2024.04.22(월) 13:00',
    },
  ];

  const bannerList = [
    {
      imageUrl:
        'http://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2403/240311100743_24002823.gif',
    },
    {
      imageUrl:
        'http://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2402/240220031949_24002486.gif',
    },
    {
      imageUrl:
        'https://www.bntnews.co.kr/data/bnt/image/2024/02/20/bnt202402200078.jpg',
    },
    {
      imageUrl:
        'https://previews.123rf.com/images/haushe/haushe1710/haushe171000009/87922362-%EB%B2%A1%ED%84%B0-%EC%9E%AC%EC%A6%88-%EA%B0%80%EB%A1%9C-%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%AC%B4%EB%8C%80-%EA%B3%A8%EB%93%9C-%EB%84%A4%EC%98%A8-%EB%B6%88%EB%B9%9B%EC%97%90-null-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%83%89%EC%86%8C%ED%8F%B0-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4%EC%9D%98-%EC%8B%A4%EB%A3%A8%EC%97%A3-%EB%9D%BC%EC%9D%B4%EB%B8%8C-%EC%9E%AC%EC%A6%88-%EC%97%B0%EC%A3%BC-%EC%9D%8C%EC%95%85-%ED%8F%AC%EC%8A%A4%ED%84%B0-%ED%85%9C%ED%94%8C%EB%A6%BF-%EC%BD%98%EC%84%9C%ED%8A%B8-%EB%82%98%EC%9D%B4%ED%8A%B8.jpg',
    },
  ];
  const getBackgroundColors = (colors: any) => {
    setBackgroundColors(colors);
  };
  const search = (query: string) => {
    console.log('검색어: ', query);
    // 검색어를 사용한 검색 로직 구현
    navigation.navigate('SearchMain', {query});
    // 예: 서버로 검색어 전송, 검색 결과 상태 업데이트 등
  };
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 1.0, y: 1.0}}
      colors={backgroundColors}
      style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.search}>
            <SearchBar
              onSearch={search}
              width={'90%'}
              backGroundColor={CARDBASE}
              textSize={16}
            />
          </View>
          <PopularConcertList
            popularConcert={concertList}
            getBackgroundColors={getBackgroundColors}
          />
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: widthPercent(10),
            }}>
            <FisrtComeList concerts={concertList} way="선착 예매" />
            <FisrtComeList concerts={concertList} way="추첨 예매" />
            <BannerList banners={bannerList} />
            <EventList />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
  search: {
    marginTop: 10,
    alignItems: 'center',
  },
});
