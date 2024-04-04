import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import NftShowcase from './NftShowcase.tsx';
import NftMyShowcase from './NftMyShowcase.tsx';
import {PublicKey} from '@solana/web3.js';
import {widthPercent} from '../../../config/Dimensions.tsx';
import {MAINBLACK} from '../../../config/Color.ts';
import {sellingNftListFind} from '../../../api/web3/nft.ts';
import {useRecoilState} from 'recoil';
import {userInfoState} from '../../../utils/recoil/Atoms.ts';
import {useConnection} from '../../../components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {useAnchorWallet} from '../../../config/web3Config.tsx';

const Tabs = ['전체목록', '내 판매록록'];

export default function NftShopMainScreen() {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);
  const [cardList, setCardList] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const {connection} = useConnection();
  const fetchNftList = async () => {
    const list = await sellingNftListFind(connection, useAnchorWallet);
    console.log(list);
    return list;
  };

  useEffect(() => {
    fetchNftList().then(nfts => setCardList(nfts));
  }, [selectedTab]); // selectedTab이 변경될 때마다 실행

  const renderTabs = () => {
    switch (selectedTab) {
      case Tabs[0]:
        console.log('nft cardList = ', cardList);
        return <NftShowcase nftList={cardList} />;
      case Tabs[1]:
        return <NftMyShowcase nftList={cardList} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.context}>
        <View style={styles.tabsContainer}>
          {Tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                selectedTab === tab && styles.tabItemSelected,
              ]}
              onPress={() => setSelectedTab(tab)}></TouchableOpacity>
          ))}
        </View>
        {renderTabs()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },
  context: {
    margin: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabItem: {
    width: widthPercent(398) / 3,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  tabItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCC434',
  },
  tabText: {
    // 정의 필요
  },
});
