import {StyleSheet, Text, View} from 'react-native';
import {CARDBASE, MAINBLACK, MAINWHITE} from '../../../config/Color';
import {F_SIZE_TITLE} from '../../../config/Font';
import {SearchBar} from '../../../components/searchBar/SearchBar';
import CastList from '../../../components/list/CastList';
import {useNavigation} from '@react-navigation/native';
import {YellowButton} from '../../../components/button/Button';

export default function ConcertRegistCastScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.context}>
          <CastList />
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
    justifyContent: 'center',
    // marginBottom: 20,
    marginBottom: 20,
  },
});
