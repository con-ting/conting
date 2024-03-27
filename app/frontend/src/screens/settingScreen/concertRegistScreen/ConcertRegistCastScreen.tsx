import {StyleSheet, Text, View} from 'react-native';
import {CARDBASE, MAINBLACK, MAINWHITE} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import {SearchBar} from '../../../components/searchBar/SearchBar';
import CastList from '../../../components/list/CastList';
import {useNavigation} from '@react-navigation/native';
import {YellowButton} from '../../../components/button/Button';
import {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const casts = [
  {
    id: '1',
    name: '임영웅',
    image:
      'https://i.namu.wiki/i/7FpxInSbpvgkaU5FWmcDzgHo5xOZ3DPK6-N7TpzMvcDjzUFU_yNzljdsIvZx7mO9-C9NmLomyB1jUWdbXaDgvg.webp',
  },
  {
    id: '2',
    name: '박효신',
    image: 'https://m.segye.com/content/image/2019/06/28/20190628507687.jpg',
  },
  {
    id: '3',
    name: '백에린',
    image:
      'https://img.asiatoday.co.kr/file/2019y/12m/23d/2019122201002305300130491.jpg',
  },
  {
    id: '4',
    name: '성시경',
    image:
      'https://yt3.googleusercontent.com/vQrdlCaT4Tx1axJtSUa1oxp2zlnRxH-oMreTwWqB-2tdNFStIOrWWw-0jwPvVCUEjm_MywltBFY=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: '5',
    name: '에픽하이',
    image:
      'https://www.coloradotimesnews.com/wp-content/uploads/2023/01/20230118_091226-1.jpg',
  },
  {
    id: '6',
    name: '싸이',
    image:
      'https://wimg.mk.co.kr/meet/neds/2021/01/image_readtop_2021_56687_16109677744511536.jpg',
  },
  {
    id: '7',
    name: '아이유',
    image:
      'https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.png',
  },
];

export default function ConcertRegistCastScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 쿼리에 따라 출연진 필터링
  const filteredCast = casts.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.context}>
          <SearchBar
            backGroundColor={CARDBASE}
            textSize={16}
            value={searchQuery}
            onSearch={setSearchQuery}
          />
          <CastList casts={filteredCast} />
        </View>
        <View style={styles.nextButton}>
          <YellowButton
            onPress={() => navigation.navigate('ConcertRegistCompany')}
            btnText="다음"
            textSize={20}
            width={'30%'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },

  container: {
    flex: 1,
    margin: 20,
  },
  context: {
    flex: 1,
  },
  nextButton: {
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 20,
    marginBottom: 20,
  },
});
