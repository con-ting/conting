import {View, StyleSheet, Text, useWindowDimensions, Alert} from 'react-native';
import FisrtComeList from '../../components/list/FirstComeList';
import PopularConcertList from './../../components/list/PopularConcertList';
import {useCallback, useEffect, useState} from 'react';
import BannerList from './../../components/list/BannerList';
import {widthPercent} from '../../config/Dimensions';
import EventList from '../../components/list/EventList';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {
  currentColor,
  fcmToken,
  goMainPageState,
  userInfoState,
} from '../../utils/recoil/Atoms';
import {ScrollView} from 'react-native-gesture-handler';
import {MainApi} from '../../api/catalog/concert';
import {Canvas, LinearGradient, Rect, vec} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Account,
  useAuthorization,
} from '../../components/mobileWalletAdapter/providers/AuthorizationProvider.tsx';
import {useConnection} from '../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {PublicKey} from '@solana/web3.js';
import {logout} from '../../api/auth/auth.ts';
import PopularSinger from '../../components/list/PopularSinger';
import Loading from '../../components/loader/Loading';
import {eventListFindAll, eventListFindByWallet} from '../../api/web3/event.ts';
import {useAnchorWallet} from '../../config/web3Config.tsx';
import {makeEventData} from '../lotteryResultScreen/ResultMainScreen.tsx';

export default function MainScreen() {
  const navigation = useNavigation();
  const currentColors = useRecoilValue(currentColor);
  const [popular, setPopular] = useState([]);
  const [first, setFirst] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [popularSingers, setPopularSinger] = useState([]);
  const firstColor = useSharedValue(currentColors[0]);
  const secondColor = useSharedValue(currentColors[1]);
  const thirdColor = useSharedValue(currentColors[2]);
  const {width, height} = useWindowDimensions();
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [goMainPage, setGoMainPage] = useRecoilState(goMainPageState);
  const [token, setToken] = useRecoilState(fcmToken);

  const validationUserInfo = useCallback(
    async (account: Account) => {
      console.log('앱 주소 =: ' + account.address);
      console.log('개인 지갑 주소 =: ' + account.publicKey);
      console.log('개인 지갑 앱 = ' + account.label);
      if (!account.publicKey.equals(new PublicKey(userInfo?.walletAddress))) {
        console.error('기존 지갑 계정과 다릅니다.');
        Alert.alert(
          'ERROR', // Alert 타이틀
          '기존 지갑 계정과 다릅니다. 지갑 계정을 바꾸고 다시 로그인해주세요', // 메시지 내용
          [
            {
              text: '확인',
              onPress: async () => {
                //로그아웃 로직
                await logout();
                setGoMainPage(false);
              },
            },
          ],
          {cancelable: false}, // 밖을 눌러서 취소할 수 없도록 설정
        );
      }
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('개인 지갑 잔액 = ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    validationUserInfo(selectedAccount);
  }, [validationUserInfo, selectedAccount]);

  // 뒷배경 애니메이션을 위한 부분
  const duration = 1000;
  const colors = useDerivedValue(() => {
    return [firstColor.value, secondColor.value, thirdColor.value];
  }, []);

  useEffect(() => {
    const onChange = async () => {
      firstColor.value = withTiming(currentColors[0], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      secondColor.value = withTiming(currentColors[1], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      thirdColor.value = withTiming(currentColors[2], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
    };
    onChange();
  }, [currentColors]);
  // 처음 화면 접속 시 서버에서 데이터 가져오기
  useEffect(() => {
    console.log(colors.value);
    const fetchData = async () => {
      console.log('API 요청');
      try {
        const data = await MainApi();
        const eventListALl = await getEventList();
        console.log('API 응답: ', data);
        setPopular(data.popular_shows);
        setFirst(data.f_shows);
        setPopularSinger(data.popular_singers);
        setEventList(eventListALl);
      } catch (error) {
        console.log('API 호출 중 오류 발생: ', error);
      }
    };
    fetchData();
  }, []);
  const getEventList = async () => {
    const result = [];

    //이벤트 내역 조회
    const eventList = await eventListFindAll({
      connection: connection,
      anchorWallet: useAnchorWallet,
    });

    for (const eventListElement of eventList) {
      result.push(makeEventData(eventListElement));
    }
    return result;
  };
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

  if (popular.length === 0 && first.length === 0) {
    return <Loading />;
  }
  return (
    <ScrollView style={styles.container}>
      <Canvas
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Rect x={0} y={0} width={width} height={3000}>
          <LinearGradient
            start={vec(100, 0)}
            end={vec(500, height / 2)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      <PopularConcertList popularConcert={popular} />
      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: widthPercent(10),
        }}>
        <FisrtComeList concerts={first} way="선착 예매" />
        <BannerList banners={bannerList} />
        <PopularSinger singers={popularSingers} />
        <EventList events={eventList} />
      </View>
    </ScrollView>
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
