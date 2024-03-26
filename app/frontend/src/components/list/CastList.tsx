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
      // 검색 페이지에서 사용될 때 다른 스크린으로 이동
      navigation.navigate('AnotherScreen', {castId: item.id});
    } else {
      // 검색 페이지가 아닐 때는 스타일만 변경
      setSelectedCast(item.id);
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
            key={item.id}
            style={[styles.member]}
            onPress={() => handlePress(item)}>
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
