import {StyleSheet, View} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {BlueButton} from '../button/Button';
import SeeAllButton from '../button/SeeAllButton';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'react-native-svg';
import SingerProfile from '../card/SingerProfile';

type singer = {
  id: string;
  name: string;
  profile: string;
  view: string;
};

type props = {
  singers: Array<singer>;
};

export default function PopularSinger(props: props) {
  console.log("popularSinger :", props)
  const {singers} = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BlueButton
          onPress={() => true}
          width={100}
          textSize={fontPercent(14)}
          btnText={'인기 가수'}
          borderWidth={3}
          disabled={true}
        />
        <SeeAllButton />
      </View>
      <View style={{margin: 10}}>
        <FlatList
          data={singers}
          decelerationRate="fast"
          horizontal
          renderItem={({item,index}) => (
            <SingerProfile {...item} backgroundNone={true}/>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: widthPercent(10),
    height: heightPercent(200),
    marginBottom: heightPercent(20),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  titleContainer: {
    flexDirection: 'row',
    margin: widthPercent(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Jalnan2TTF',
    color: '#FFFFFF',
    margin: 10,
  },
});
