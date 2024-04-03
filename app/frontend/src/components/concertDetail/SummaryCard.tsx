import {Image, StyleSheet, Text, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_TEXT, F_SIZE_Y_TITLE} from '../../config/Font';
import {korDateFormatString} from './../../utils/common/TimeFormat';
import FastImage from 'react-native-fast-image';

const Info = ({title, contents}: {title: string; contents: Array<string>}) => {
  return (
    <View>
      <Text style={F_SIZE_Y_TITLE}>{title}</Text>
      {contents.map((content, index) => {
        return (
          <Text key={index} style={F_SIZE_TEXT}>
            {content}
          </Text>
        );
      })}
    </View>
  );
};

export default function SummaryCard({info}: {info: any}) {
  console.log('info: ', info);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.stretch}
          style={styles.image}
          source={{uri: info.show.poster}}
        />
      </View>
      <View style={styles.cardContainer}>
        <Info title="공연 장소" contents={[info.hall.name]} />
        <Info
          title="예매 기간"
          contents={[
            korDateFormatString(info.show.ticket_open_date),
            korDateFormatString(info.show.ticket_close_date),
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: widthPercent(20),
    width: '100%',
    height: heightPercent(300),
  },
  imageContainer: {
    flex: 4,
  },
  cardContainer: {
    flex: 3,
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    marginLeft: widthPercent(15),
  },
  image: {
    borderRadius: widthPercent(20),
    height: heightPercent(300),
  },
});
