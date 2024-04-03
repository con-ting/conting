import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {widthPercent} from '../../config/Dimensions';
import {getColors} from 'react-native-image-colors';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Canvas, LinearGradient, Rect, vec} from '@shopify/react-native-skia';
import {AuthHeader} from '../../components/header/AuthHeader.tsx';
import * as ICON from 'iconsax-react-native';
import {MAINBLACK, TEXTGRAY} from '../../config/Color.ts';
import {BODY1} from '../../config/Typography.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import {Toggle} from '../../components/button/Toggle.tsx';
import NFTCard from '../../components/card/NFTCard.tsx';
import {nftListFindByMyWallet} from '../../api/web3/nft.ts';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../utils/recoil/Atoms.ts';
import {PublicKey} from '@solana/web3.js';
import {useConnection} from '../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
const defualtList = [
  // {
  //   ticketAddress: 'Ati6E8fcVeugB8tHE4W3CUgcPFCR3wrMGushG4g8paFZ',
  //   ownerAddress: '8jQnaWEY6EQdSL3jS9XDuEqYgACPmXRaR7hup3NYnLwj',
  //   primarySaleHappened: false,
  //   poster:
  //     'https://search.pstatic.net/common?type=f&size=224x338&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240131_125%2F1706681961365GvH5L_PNG%2F269_image_url_1706681961328.png',
  //   title: '임영웅 콘서트 IM HERO TOUR 2023',
  //   date: new Date(),
  //   location: 'SSAFY',
  //   row: '나',
  //   no: 4,
  //   webmUrl:
  //     'https://pub-42d3d2de01ff4e1baef74a4d07121130.r2.dev/1/290/38cd9a1e3cfc7a0811517aae38368ab23aab672694593b9ffbaeea9a0edd9a80.webm',
  //   isEventAble: true,
  // },
  // {
  //   ticketAddress: 'Ati6E8fcVeugB8tHE4W3CUgcPFCR3wrMGushG4g8paFZ',
  //   ownerAddress: '8jQnaWEY6EQdSL3jS9XDuEqYgACPmXRaR7hup3NYnLwj',
  //   primarySaleHappened: true,
  //   poster:
  //     'http://www.kopis.or.kr/upload/pfmPoster/PF_PF238364_240329_131111.gif',
  //   title: '로스트아크 OST 전국투어 콘서트: SOUND OF LOST ARK [서울]',
  //   date: new Date(),
  //   location: 'SSAFY',
  //   row: '가',
  //   no: 4,
  //   webmUrl:
  //     'https://pub-42d3d2de01ff4e1baef74a4d07121130.r2.dev/1/290/38cd9a1e3cfc7a0811517aae38368ab23aab672694593b9ffbaeea9a0edd9a80.webm',
  //   isEventAble: true,
  // },
  // {
  //   ticketAddress: 'Ati6E8fcVeugB8tHE4W3CUgcPFCR3wrMGushG4g8paFZ',
  //   ownerAddress: '8jQnaWEY6EQdSL3jS9XDuEqYgACPmXRaR7hup3NYnLwj',
  //   primarySaleHappened: true,
  //   poster:
  //     'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/02/2024022110462240e3b3a2-7bdd-4303-bd7d-e05005a4a078.jpg/melon/resize/180x254/strip/true/quality/90/optimize',
  //   title: 'HIPHOPPLAYA FESTIVAL 2024',
  //   date: new Date(),
  //   location: 'SSAFY',
  //   row: '가',
  //   no: 4,
  //   webmUrl:
  //     'https://pub-42d3d2de01ff4e1baef74a4d07121130.r2.dev/1/290/38cd9a1e3cfc7a0811517aae38368ab23aab672694593b9ffbaeea9a0edd9a80.webm',
  //   isEventAble: true,
  // },
  // {
  //   ticketAddress: 'Ati6E8fcVeugB8tHE4W3CUgcPFCR3wrMGushG4g8paFZ',
  //   ownerAddress: '8jQnaWEY6EQdSL3jS9XDuEqYgACPmXRaR7hup3NYnLwj',
  //   primarySaleHappened: true,
  //   poster:
  //     'https://ticketimage.interpark.com/Play/image/large/24/24004177_p.gif',
  //   title: '다나카 내한 공연［SAYONARA TANAKA］',
  //   date: new Date(),
  //   location: 'SSAFY',
  //   row: '가',
  //   no: 4,
  //   webmUrl:
  //     'https://pub-42d3d2de01ff4e1baef74a4d07121130.r2.dev/1/290/38cd9a1e3cfc7a0811517aae38368ab23aab672694593b9ffbaeea9a0edd9a80.webm',
  //   isEventAble: false,
  // },
];

export default function NftTicketListScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posterColors, setPosterColors] = useState([
    '#000000',
    '#000000',
    '#000000',
  ]);
  const firstColor = useSharedValue(posterColors[0]);
  const secondColor = useSharedValue(posterColors[1]);
  const thirdColor = useSharedValue(posterColors[2]);
  const {width, height} = useWindowDimensions();
  const toggleWidth = width
  const toggleHeight = Math.floor(height/10)
  const [toggleState, setToggleState] = useState(false);
  const [filteringList, setFilteringList] = useState([]);
  const [concertList, setConcertList] = useState(defualtList);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const {connection} = useConnection();

  useEffect(() => {
    if (toggleState) {
      setFilteringList(
        concertList.filter(item => item.primarySaleHappened === !toggleState),
      );
    } else {
      setFilteringList(concertList);
    }
  }, [toggleState]);

  // 뒷배경 애니메이션을 위한 부분
  const duration = 1000;
  const colors = useDerivedValue(() => {
    return [firstColor.value, secondColor.value, thirdColor.value];
  }, []);
  useEffect(() => {
    const onChange = async () => {
      firstColor.value = withTiming(posterColors[0], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      secondColor.value = withTiming(posterColors[1], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
      thirdColor.value = withTiming(posterColors[2], {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
      });
    };
    onChange();
  }, [posterColors]);

  // 배경색 가져오기
  useEffect(() => {
    getColors(concertList[currentIndex].poster.uri, {
      cache: true,
      key: concertList[currentIndex].poster.uri,
    }).then((res): any => {
      setPosterColors([res?.dominant, res.muted, res.average]);
    });
  }, [currentIndex]);

  useEffect(() => {
    const settingList = async () => {
      const myNftList = await nftListFindByMyWallet({
        connection: connection,
        myWalletAddress: new PublicKey(userInfo?.walletAddress),
      });
      setConcertList(myNftList);
    };
    settingList();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.ticketContainer}>
        <NFTCard
          poster={item.poster.uri}
          title={item.title}
          date={item.date}
          location={item.location}
          row={item.row}
          no={item.no}
          ticketAddress={item.ticketAddress}
          webmUrl={item.webmUrl.uri}
          colors={posterColors}
          sellerFeeBasisPoints={item.sellerFeeBasisPoints}
          primarySaleHappened={item.primarySaleHappened}
          creatorAddressList={item.creatorAddressList}
          description={item.description}
          jsonMetaData={item.jsonMetaData}
          ownerAddress={item.ownerAddress}
          accountData={item.accountData}
          grade={item.grade}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Canvas
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(100, 0)}
            end={vec(width, height / 2)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      {/* <AuthHeader
        text="티켓북"
        borderLevel={5}
        rightIcon={<ICON.Shop size={22} color={TEXTGRAY} variant="Bold" />}
        fontColor={MAINBLACK}
        onRightPress={() => {
          navigation.navigate('NftShopMainScreen');
        }}
      /> */}
      <View style={{...styles.toggleBox, top:toggleHeight, right:10}}>
        <BODY1>관람한 NFT 티켓 보기</BODY1>
        <Spacer space={20} horizontal={true}></Spacer>
        <Toggle isEnabled={toggleState} setIsEnabled={setToggleState}></Toggle>
      </View>
      <Carousel
        data={filteringList}
        renderItem={renderItem}
        width={widthPercent(400)}
        mode="horizontal-stack"
        modeConfig={{
          moveSize: 100,
          stackInterval: 50,
          scaleInterval: 0.1,
          rotateZDeg: 80,
        }}
        onSnapToItem={index => setCurrentIndex(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    marginBottom: 50,
  },
  toggleBox: {
    position: 'absolute',
    zIndex:100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
