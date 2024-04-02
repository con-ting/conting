import React from 'react';
import {View, StyleSheet} from 'react-native';

import NFTTicketInfoCard from '../../../components/card/NFTTicketInfoCard.tsx';
import {MAINBLACK} from '../../../config/Color.ts';
export type NFTTicketCardProps = {
  onPress: () => void;
  poster: string;
  title: string;
  money: string;
  status: boolean;
  showInKRW: boolean;
};
export default function NftShowcase(props: {
  nftList: Array<NFTTicketCardProps>;
}) {
  console.log(props.nftList);
  return (
    <View style={styles.container}>
      {props.nftList.map(
        nft =>
          nft && (
            <View style={styles.card}>
              <NFTTicketInfoCard
                onPress={nft.onPress}
                poster={nft.poster}
                title={nft.title}
                money={nft.money}
                status={nft.status}
                showInKRW={nft.showInKRW}
              />
            </View>
          ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
});
