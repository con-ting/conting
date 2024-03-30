import {Image, StyleSheet, Text, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_TEXT, F_SIZE_Y_TITLE} from '../../config/Font';

const Info = ({title, content}: {title: string; content: any}) => {
  return (
    <View>
      <Text style={F_SIZE_Y_TITLE}>{title}</Text>
      <Text style={F_SIZE_TEXT}>{content}</Text>
    </View>
  );
};

export default function SummaryCard({info}: {info: any}) {
  // console.log('info: ', info);
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={{uri: info.show.poster}} />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <Info title="장소" content={info.hall.address} />
          <Info title="공연일" content={info.schedule[0].start_datetime} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: widthPercent(16),
    width: widthPercent(380),
    height: heightPercent(300),
  },
  cardContainer: {
    flex: 1,
    // justifyContent: 'space-evenly',
  },
  row: {
    // backgroundColor: 'white',
    // flexDirection: 'row',
    gap: widthPercent(10),
    margin: 20,
  },
  image: {
    // resizeMode: 'stretch',
    resizeMode: 'cover',
    // resizeMode: 'stretch',
    borderTopLeftRadius: widthPercent(16),
    borderBottomLeftRadius: widthPercent(16),
    height: heightPercent(300),
  },
});
