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
import {eventListFindAll} from '../../api/web3/event.ts';
import {useAnchorWallet} from '../../config/web3Config.tsx';
import {makeMyEventData} from '../lotteryResultScreen/ResultMainScreen.tsx';
import {BLUEBASE, MAINGRAY, MINTBASE} from '../../config/Color.ts';
export function makeEventData(props: {web3Data: any}) {
  // 현재 시간을 Unix 타임스탬프로 가져옵니다.
  const now = new Date().getTime();

  // BN 인스턴스를 사용하여 timestamp를 숫자로 변환합니다.
  const startTimestamp =
    props.web3Data.account.startTimestamp.toNumber() * 1000; // 첫 번째 원소를 사용한다고 가정
  const endTimestamp = props.web3Data.account.endTimestamp.toNumber() * 1000; // 첫 번째 원소를 사용한다고 가정

  let img_tag: string;
  let img_tag_color: string;
  // 현재 시간이 이벤트 기간 내인지 확인합니다.
  if (now > startTimestamp && now < endTimestamp) {
    img_tag = '진행 중';
    img_tag_color = BLUEBASE;
  } else if (now >= endTimestamp) {
    // 이벤트가 종료되었고, 당첨자 명단에 내 지갑 주소가 있는지 확인합니다.
    img_tag_color = MINTBASE;
    img_tag = '응모 마감';
  } else {
    img_tag = '응모 예정';
    img_tag_color = MAINGRAY;
  }

  // 변환된 cardProps 객체를 반환합니다.
  return {
    onPress: () => {
      //네비게이션으로 이동
      Alert.alert('앙 이벤트띠');
    },
    disabled: false,
    eventArddress: props.web3Data.publicKey,
    name: props.web3Data.account.name,
    img_url: props.web3Data.account.uri,
    participants: props.web3Data.account.participants,
    winnersTotal: props.web3Data.account.winnersTotal,
    img_tag: img_tag,
    img_tag_color: img_tag_color,
    start_at: new Date(startTimestamp).toISOString(),
    end_at: new Date(endTimestamp).toISOString(),
  };
}
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
        const eventListAll = await getEventList();
        console.log('API 응답: ', data);
        console.log('API eventListALl: ', eventListAll);
        setPopular(data.popular_shows);
        setFirst(data.f_shows);
        setPopularSinger(data.popular_singers);
        setEventList(eventListAll);
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
    console.log('eventList', eventList);
    for (const eventListElement of eventList) {
      const newVar = makeEventData({
        web3Data: eventListElement,
      });
      result.push(newVar);
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
