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
import {useNavigation} from '@react-navigation/native';

export default function CastList({casts, isSearch}) {
  const [selectedCast, setSelectedCast] = useState(null); //출연진 선택
  const navigation = useNavigation();

  const handlePress = item => {
    if (isSearch) {
      // 검색 페이지에서 사용될 때 클릭 시 가수 상세 페이지로 이동
      console.log(item.singer_id);
      navigation.navigate('CastDetail', {castId: item.singer_id});
    } else {
      // 검색 페이지가 아닐 때는 스타일만 변경
      setSelectedCast(item.singer_id);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={casts}
        style={styles.context}
        numColumns={3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item.singer_id}
            style={[styles.member]}
            onPress={() => handlePress(item)}>
            <Image
              source={{uri: item.singer_profile_image}}
              style={[
                styles.castImage,
                selectedCast === item.singer_id && styles.selectedMember,
              ]}
            />
            <Text
              style={[
                F_SIZE_TITLE,
                styles.name,
                selectedCast === item.singer_id && styles.selectedName,
              ]}>
              {item.singer_name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.singer_id}
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
