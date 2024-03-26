import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CARDBASE, MAINYELLOW} from '../../config/Color';
import {F_SIZE_BIGTEXT, F_SIZE_TITLE} from '../../config/Font';
import {SearchBar} from '../searchBar/SearchBar';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {useState} from 'react';

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

export default function CastList() {
  const [searchQuery, setSearchQuery] = useState(''); //출연진 검색 필터링
  const [selectedCast, setSelectedCast] = useState(null); //출연진 선택
  const [members, setMembers] = useState(casts);

  // 검색 쿼리에 따라 출연진 필터링
  const filteredCast = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <SearchBar
        backGroundColor={CARDBASE}
        textSize={16}
        value={searchQuery}
        onSearch={query => setSearchQuery(query)}
      />
      <FlatList
        data={filteredCast}
        style={styles.context}
        numColumns={3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.member]}
            onPress={() => setSelectedCast(item.id)}>
            <Image
              source={{uri: item.image}}
              style={[
                styles.castImage,
                selectedCast === item.id && styles.selectedMember,
              ]}
            />
            <Text
              style={[
                F_SIZE_TITLE,
                styles.name,
                selectedCast === item.id && styles.selectedName,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: CARDBASE,
  },
  context: {
    width: widthPercent(376),
    height: heightPercent(500),
    backgroundColor: CARDBASE,
    borderRadius: 12,
    marginTop: 20,
  },
  member: {
    margin: 22,
    // backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',s
  },
  castImage: {
    width: widthPercent(80),
    height: heightPercent(80),
    borderRadius: 50,
  },
  name: {
    marginTop: 15,
  },
  selectedMember: {
    borderWidth: 3,
    borderColor: MAINYELLOW,
  },
  selectedName: {
    color: MAINYELLOW,
  },
});
