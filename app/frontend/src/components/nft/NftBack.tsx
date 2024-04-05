import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercent} from '../../config/Dimensions';
import FastImage from 'react-native-fast-image';
import {F_SIZE_TEXT, F_SIZE_Y_BIGTEXT, F_SIZE_Y_TEXT} from '../../config/Font';
import Clipboard from '@react-native-clipboard/clipboard';
import {PublicKey} from '@solana/web3.js';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';

type nftBackProps = {
  ticketAddress: PublicKey;
  title: string;
  webmUrl: string;
  sellerFeeBasisPoints: any;
  primarySaleHappened: boolean;
  creatorAddressList: any;
  jsonMetaData: any;
  ownerAddress: PublicKey;
  accountData: any;
};
/**
 * NftBack 입니다.
 * @param props
 * - ticketAddress:티켓 주소
 * - title: 콘서트 제목
 * - webmUrl: 움짤
 * - sellerFeeBasisPoints: 수수료
 * - primarySaleHappened: 최초 구매자 인지
 * - creatorAddressList: 생성자 리스트들
 * - jsonMetaData: Json Meta DAta
 * - ownerAddress: 구매자
 * - accountData: 어카운트 데이터
 * @returns
 * @author 김형민
 */
const width = Dimensions.get('window').width * 0.9;
const height = 320;
export default function NftBack(props: nftBackProps) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false); // 비디오 재생 상태를 제어하는 state

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };
  const videoUrl = props.webmUrl
    ? props.webmUrl
    : 'https://pub-42d3d2de01ff4e1baef74a4d07121130.r2.dev/1/5/8cb6a38a801b05612706a4a8bae68ea05ed6ad4c6938bf9e2987daaf72a20997.webm';
  return (
    <View style={{...styles.container, width: width, height: height}}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{uri: props.webmUrl}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <Video
          source={{uri: videoUrl}}
          ref={videoRef}
          style={styles.image}
          paused={paused}
          resizeMode="contain"
          onError={e => console.log(e)} // 에러 핸들링
          onEnd={() => {
            setPaused(true);
          }}
        />
      </View>
      <View style={styles.textCard}>
        <View style={styles.title}>
          <Text style={F_SIZE_Y_BIGTEXT}>{props.title}</Text>
        </View>
        <View style={styles.contentCard}>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>NFT 주소</Text>
            <TouchableOpacity
              onPress={copyToClipboard(props.ticketAddress.toBase58())}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={F_SIZE_TEXT}>
                {props.ticketAddress.toBase58()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>수수료 정보</Text>
            <Text style={F_SIZE_TEXT} numberOfLines={1} ellipsizeMode="tail">
              {props.sellerFeeBasisPoints}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>응모 가능 여부</Text>
            <Text style={F_SIZE_TEXT}>{props.primarySaleHappened}</Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>소유자 주소</Text>
            <Text style={F_SIZE_TEXT}>{String(props.ownerAddress)}</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
              borderRadius: widthPercent(20),
            }}>
            <Text style={F_SIZE_Y_TEXT}>응모 가능</Text>
          </View>
        </View>
      </View>
      {/* 
      제목, 날짜, 티켓주소, 수수료,  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 3,
    borderRadius: widthPercent(20),
  },
  image: {
    flex: 1,
    borderRadius: widthPercent(20),
  },
  textCard: {
    flex: 2,
    padding: widthPercent(10),
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    flex: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
