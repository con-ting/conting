import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  CUTEYELLOW,
  MAINBLACK,
  MAINWHITE,
  MAINYELLOW,
} from '../../../config/Color.ts';
import {nftListFindByMyWallet} from '../../../api/web3/nft.ts';
import {PublicKey} from '@solana/web3.js';
import {useConnection} from '../../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../../utils/recoil/Atoms.ts';
import NftSelectCard from '../../../components/nft/NftSelectCard.tsx';
import {MAINFONT} from '../../../config/Font.ts';
import {H1, H4} from '../../../config/Typography.tsx';
import {Spacer} from '../../../utils/common/Spacer.tsx';
import {doEvent} from '../../../api/web3/event.ts';
import {useAnchorWallet} from '../../../config/web3Config.tsx';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.56;
const CARD_OFFSET = 15;

export default function SelectNftScreen(props: {selectItem: any}) {
  const [cards, setCards] = useState([]);
  const [removedCards, setRemovedCards] = useState([]);

  const pan = useRef(new Animated.ValueXY()).current;

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const {connection} = useConnection();
  console.log('select item ', props.selectItem);
  useEffect(() => {
    const settingList = async () => {
      const nftList = await nftListFindByMyWallet({
        connection: connection,
        myWalletAddress: new PublicKey(userInfo?.walletAddress),
      });
      console.log('api 호출');
      // Initialize each item with an Animated.Value and the nft data
      const initializedList = nftList.map((item, index) => ({
        ...item,
        xAnim: new Animated.Value(0),
      }));
      setCards(initializedList);
    };
    settingList();
  }, [connection, userInfo?.walletAddress]);
  // useEffect(() => {
  //   console.log('cards log = ', cards);
  // }, [cards]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, {dx}) => {
        if (dx < -100) {
          Animated.timing(pan, {
            toValue: {x: -width, y: 0},
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            setCards(currentCards => {
              const newCards = [...currentCards];
              const topCard = newCards.pop(); // 배열의 마지막 요소를 제거
              if (topCard) {
                newCards.unshift(topCard); // 배열의 시작에 추가
              }
              pan.setValue({x: 0, y: 0});
              return newCards; // 새로운 배열 상태 반환
            });
          });
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const renderCards = () => {
    return (
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <Animated.View
            key={`card_${index}`}
            style={[
              styles.card,
              {
                backgroundColor: MAINBLACK,
                transform: [
                  {translateX: index === cards.length - 1 ? pan.x : 0},
                ],
                bottom: (cards.length - index - 1) * CARD_OFFSET,
                borderWidth: index === cards.length - 1 ? 2 : 0,
                borderColor: MAINYELLOW,
              },
            ]}
            {...(index === cards.length - 1 ? panResponder.panHandlers : {})}>
            <NftSelectCard
              title={card.title}
              ticketAddress={card.ticketAddress}
              poster={card.poster.uri}
              sellerFeeBasisPoints={card.sellerFeeBasisPoints}
              primarySaleHappened={card.primarySaleHappened}
              creatorAddressList={card.creatorAddressList}
              jsonMetaData={card.jsonMetaData}
              ownerAddress={card.ownerAddress}
              accountData={card.accountData}
            />
          </Animated.View>
        ))}
      </View>
    );
  };

  const apiSender = () => {
    if (cards.length > 0) {
      const topCard = cards[cards.length - 1];
      Alert.alert(
        'Top Card Info',
        `이름: ${topCard.title}, 주소: ${topCard.ticketAddress}`,
      );
      const promise = doEvent({
        connection: connection,
        anchorWallet: useAnchorWallet,
        myWalletAddress: new PublicKey(userInfo?.walletAddress),
        nftAddress: new PublicKey(topCard.ticketAddress),
        // eventAddress: new PublicKey(props.selectItem.eventAddress),
        eventAddress: new PublicKey(
          '3KZGiuXRYdUc2xuSujnjmvs8k3MqRz9vk7spoxJNYupw',
        ),
      });
      console.log('===================');
      console.log('promise ==', promise);
      console.log('===================');
    }
  };

  return (
    <View style={styles.container}>
      <Spacer space={30}></Spacer>
      {renderCards()}
      <TouchableOpacity style={styles.button} onPress={apiSender}>
        <Text style={styles.buttonText}>선택한 NFT를 응모권에 사용하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: CUTEYELLOW,
  },
  cardsContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 22,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: MAINYELLOW,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: MAINFONT,
    color: MAINBLACK,
    fontSize: 16,
  },
});
