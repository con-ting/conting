import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
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
import {BODY1} from '../../config/Typography.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';
import {Toggle} from '../../components/button/Toggle.tsx';
import NFTCard from '../../components/card/NFTCard.tsx';
import {nftListFindByMyWallet} from '../../api/web3/nft.ts';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../utils/recoil/Atoms.ts';
import {PublicKey} from '@solana/web3.js';
import {useConnection} from '../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
const defualtList = [];

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
  const toggleWidth = width;
  const toggleHeight = Math.floor(height / 10);
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
  }, [toggleState, concertList]);

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
    if (!concertList.length) {
      return;
    }
    getColors(concertList[currentIndex].poster.uri, {
      cache: true,
      key: concertList[currentIndex].poster.uri,
    }).then((res): any => {
      setPosterColors([res?.dominant, res.muted, res.average]);
    });
  }, [currentIndex, concertList]);

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
      <View style={{...styles.toggleBox, top: toggleHeight, right: 10}}>
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
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
