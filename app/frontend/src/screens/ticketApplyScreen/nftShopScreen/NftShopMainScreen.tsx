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
import {getNft} from '../../../api/web3/nft.ts';
import {PublicKey} from '@solana/web3.js';
import {widthPercent} from '../../../config/Dimensions.tsx';
import {MAINBLACK} from '../../../config/Color.ts';

const Tabs = ['전체목록', '내 판매록록'];

export default function NftShopMainScreen() {
  const [selectedTab, setSelectedTab] = useState(Tabs[0]);
  const [cardList, setCardList] = useState([]);

  const fetchNftList = async () => {
    const parameters = [
      '3sTa62uGxiz5S3z5LBsSpuDeBs75P1owHoGzt8e2BckxihpB3qjvcJ4tBNtVVSPNbqp9vtjn1rvMb84vBeNgxkGk',
      '5EC3c1UBx8ouZqGdew8arue3TrpYkXVQwRrVUw57AREvNnyLAYDuAyjt7LBk23ac1U9nxnb9bboUqMhAvNQkeWUz',
      '5fDDPvdFWKzrEdf8LuHjTQaCdDhH6bzFAehuhuW1Xoks8oWhBTAbtAJbiKHyqv5Vn5eoRSRLdXEK7PFTfsXqASpx',
      '3bTC87SjNQUZLszrgnpP6vN8Skf2LJP8HLBLu8FuK6dhJT7tWqsfLzWBrpMGtcft6sqVYMYosvJb7zyNACjPf91T',
    ].map(pubKey => new PublicKey(pubKey));

    const nfts = await getNft(parameters);
    return nfts;
  };

  useEffect(() => {
    fetchNftList().then(nfts => setCardList(nfts));
  }, [selectedTab]); // selectedTab이 변경될 때마다 실행

  const renderTabs = () => {
    switch (selectedTab) {
      case Tabs[0]:
        console.log('nft cardList = ', cardList);
      // return <NftShowcase nftList={cardList} />;
      case Tabs[1]:
      // return <NftMyShowcase nftList={cardList} />;
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
              onPress={() => setSelectedTab(tab)}>
              <Text style={styles.tabText}>{tab}</Text> {/* 수정 필요 */}
            </TouchableOpacity>
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
