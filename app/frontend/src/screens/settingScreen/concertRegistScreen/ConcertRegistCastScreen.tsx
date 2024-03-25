import {StyleSheet, Text, View} from 'react-native';
import {CARDBASE, MAINBLACK, MAINWHITE} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import {SearchBar} from '../../../components/searchBar/SearchBar';

export default function ConcertRegistCastScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <SearchBar backGroundColor={CARDBASE} textSize={16} />
      </View>
    </View>
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
});
