import {View, StyleSheet, Text} from 'react-native';
import FisrtComeList from '../../components/list/FirstComeList';
import PopularConcertList from './../../components/list/PopularConcertList';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useState} from 'react';
import BannerList from './../../components/list/BannerList';
import {widthPercent} from '../../config/Dimensions';
import EventList from '../../components/list/EventList';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {currentColor, pastColor} from '../../utils/recoil/Atoms';
import {ScrollView} from 'react-native-gesture-handler';
import { MainApi } from '../../api/catalog/concert';

export default function MainScreen() {
  const navigation = useNavigation();
  const pastColors = useRecoilValue(pastColor)
  const currentColors = useRecoilValue(currentColor);
  const [popular, setPopular] = useState([]);
  const [first, setFirst] = useState([]);
  const [deadline, setDeadline] = useState([]);
  const [popularSinger, setPopularSinger] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('API 요청');
      try {
        const data = await MainApi();
        console.log('API 응답: ', data);
        setPopular(data.popular_shows);
        setFirst(data.f_shows);
        setDeadline(data.r_shows);
        setPopularSinger(data.popularsingers);
      } catch (error) {
        console.log('API 호출 중 오류 발생: ', error);
      }
    };
    fetchData();
  }, []);

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

  const search = (query: string) => {
    console.log('검색어: ', query);
    // 검색어를 사용한 검색 로직 구현
    navigation.navigate('SearchMain', {query});
    // 예: 서버로 검색어 전송, 검색 결과 상태 업데이트 등
  };

  if (popular.length === 0) {
    return <Text>...로딩</Text>;
  }
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      colors={currentColors}
      style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.search}></View>
          <PopularConcertList popularConcert={popular} />
          <View
          style={{
              flexDirection: 'column',
              marginHorizontal: widthPercent(10),
            }}>
            <FisrtComeList concerts={first} way="선착 예매" />
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
  search: {
    marginTop: 10,
    alignItems: 'center',
  },
});
