import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Dimensions, PanResponder} from 'react-native';
import {PublicKey} from '@solana/web3.js';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../../utils/recoil/Atoms';
import {useConnection} from '../../../components/mobileWalletAdapter/providers/ConnectionProvider';
import NFTCard from '../../../components/card/NFTCard';
import {MAINBLACK, MAINWHITE, MAINYELLOW} from '../../../config/Color.ts';
import {nftListFindByMyWallet} from '../../../api/web3/nft.ts';
import NftBack from '../../../components/nft/NftBack.tsx';

const {width} = Dimensions.get('window');
export default function SelectNftScreen({route}) {
  const [cards, setCards] = useState([]);
  const cardRef = useRef('fold'); // "fold" or "unfold"
  const [focus, setFocus] = useState(5);
  const yAnim = useRef(new Animated.Value(0)).current;
  const rotateZAnim = useRef(new Animated.Value(0)).current;
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const {connection} = useConnection();

  useEffect(() => {
    const settingList = async () => {
      const nftList = await nftListFindByMyWallet({
        connection: connection,
        myWalletAddress: new PublicKey(userInfo?.walletAddress),
      });
      // Initialize each item with an Animated.Value
      const initializedList = nftList.map((item, index) => ({
        ...item,
        xAnim: new Animated.Value(0), // Here we add an Animated.Value for each item
      }));
      setCards(initializedList);
    };
    settingList();
  }, []);

  // panResponder와 관련된 코드는 생략하고, 필요한 수정을 진행해주세요.
  const panResponer = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const {dy, dx} = gestureState;
      // dy, dx 뭐가 더 크게 변했을까
      const XSlider = Math.abs(dy) < Math.abs(dx);
      const YSlider = Math.abs(dx) < Math.abs(dy);
      if (XSlider) {
        // 카드 버리기
        if (dx < -5 && cardRef.current === 'fold' && 0 <= focus) {
          cards[focus].xAnim.setValue(dx);
        }

        // 카드 가져오기
        // if (5 < dx && cardRef.current === 'fold' && focus <= 5) {
        //   card[focus].xAnim.setValue(dx);
        // }
      }

      if (YSlider) {
        if (5 < dy && dy < 100 && cardRef.current === 'fold') {
          yAnim.setValue(dy);
        }

        if (5 < dy && dy < 100 && cardRef.current === 'unfold') {
          rotateZAnim.setValue(dy);
        }

        if (-75 < dy && dy < 5 && cardRef.current === 'unfold') {
          yAnim.setValue(65 + dy);
        }
      }
    },
    onPanResponderEnd: (evt, gestureState) => {
      const {dy, dx} = gestureState;
      const XSlider = Math.abs(dy) < Math.abs(dx);
      const YSlider = Math.abs(dx) < Math.abs(dy);
      if (XSlider) {
        if (dx < -5 && cardRef.current === 'fold' && 0 <= focus) {
          Animated.timing(cards[focus].xAnim, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) {
              setFocus(el => el - 1);
            }
          });
        }

        if (5 < dx && cardRef.current === 'fold' && focus < 5) {
          Animated.timing(cards[focus + 1].xAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) {
              setFocus(el => el + 1);
            }
          });
        }
      }

      if (YSlider) {
        if (5 < dy) {
          Animated.spring(yAnim, {
            toValue: 65,
            duration: 300,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'unfold';
        }

        if (5 < dy && cardRef.current === 'unfold') {
          Animated.spring(rotateZAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }

        if (dy < -5) {
          Animated.spring(yAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'fold';
        }
      }
    },
  });
  return (
    <View
      {...panResponer.panHandlers}
      style={{
        flex: 1,
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'relative',
          width: width * 0.7,
          height: width * 0.7 * 0.58 + (cards.length - 1) * 20,
        }}>
        {cards.map((card, index) => {
          const translateY = yAnim.interpolate({
            inputRange: [0, 100],
            outputRange: [0, index * 20], // 예를 들어, 각 카드가 조금씩 아래로 내려가도록 설정
          });
          return (
            <Animated.View
              key={index}
              style={{
                transform: [
                  {translateY},
                  {translateX: card.xAnim},
                  {
                    rotateZ: rotateZAnim.interpolate({
                      inputRange: [0, 20],
                      outputRange: ['0deg', '2deg'],
                    }),
                  },
                ],
                position: 'absolute',
                marginTop: index * 20,
                backgroundColor: MAINBLACK,
                borderRadius: 4,
                width: width * 0.7,
                height: width * 0.7 * 0.58,
                shadowOffset: {width: -3, height: -3},
                shadowOpacity: 0.2,
                shadowRadius: 10,
              }}>
              <NftBack
                title={card.title}
                ticketAddress={card.ticketAddress}
                webmUrl={card.webmUrl.uri}
                sellerFeeBasisPoints={card.sellerFeeBasisPoints}
                primarySaleHappened={card.primarySaleHappened}
                creatorAddressList={card.creatorAddressList}
                jsonMetaData={card.jsonMetaData}
                ownerAddress={card.ownerAddress}
                accountData={card.accountData}
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}
