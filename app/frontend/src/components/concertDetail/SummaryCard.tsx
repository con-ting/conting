import {Image, StyleSheet, Text, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_TEXT} from '../../config/Font';

export default function SummaryCard({info}: {info: any}) {
  console.log(info);
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={{uri: info.poster}} />
      </View>
      <View style={{...styles.cardContainer, alignItems: 'center'}}>
        <View>
          <Text>장소</Text>
          <Text>{info.address}</Text>
        </View>
        <View>
          <Text>제목</Text>
          <Text style={F_SIZE_TEXT}>{info.title}</Text>
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
    height: heightPercent(350),
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  image: {
    resizeMode: 'stretch',
    borderRadius: widthPercent(16),
    height: heightPercent(350),
  },
});
