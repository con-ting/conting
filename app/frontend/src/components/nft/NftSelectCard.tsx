import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {widthPercent} from '../../config/Dimensions';
import FastImage from 'react-native-fast-image';
import {F_SIZE_TEXT, F_SIZE_Y_BIGTEXT, F_SIZE_Y_TEXT} from '../../config/Font';
import {PublicKey} from '@solana/web3.js';
import {Spacer} from '../../utils/common/Spacer.tsx';

type NftBackProps = {
  ticketAddress: PublicKey;
  title: string;
  poster: string;
  sellerFeeBasisPoints: any;
  primarySaleHappened: boolean;
  creatorAddressList: any;
  jsonMetaData: any;
  ownerAddress: PublicKey;
  accountData: any;
};

export default function NftSelectCard(props: NftBackProps) {
  console.log('props = ', props);
  return (
    <View style={[styles.container]}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{uri: props.poster}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
      <View
        style={[
          styles.textCard,
          {
            /* Adjusted for 70% */
          },
        ]}>
        {/* Text and other content elements remain unchanged */}
        <View style={styles.title}>
          <Text style={F_SIZE_Y_BIGTEXT}>{props.title}</Text>
        </View>
        <Spacer space={8}></Spacer>
        <View style={styles.contentCard}>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>NFT 주소</Text>
            <Text style={F_SIZE_TEXT}>{props.ticketAddress.toBase58()}</Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>가수 명</Text>
            <Text style={F_SIZE_TEXT}>{props.accountData.data.name}</Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>거래시 수수료</Text>
            <Text style={F_SIZE_TEXT}>
              {props.accountData.data.sellerFeeBasisPoints * 0.01} %
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>특이사항</Text>
            <Text style={F_SIZE_TEXT}>
              {props.primarySaleHappened ? 'NFT 거래한 티켓' : '직관한 티켓'},
              {props.accountData.uses.remaining.toNumber() === 1
                ? ' 응모권 사용 가능'
                : ' 응모권 사용 불가능'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: widthPercent(14), // Adjusted for 70%
  },
  imageContainer: {
    flex: 1,
    borderRadius: widthPercent(14),
  },
  image: {
    flex: 1,
    borderRadius: widthPercent(14),
  },
  textCard: {
    flex: 1.4,
    padding: widthPercent(7),
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
