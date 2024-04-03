import {StyleSheet, Text, View} from 'react-native';
import {widthPercent} from '../../config/Dimensions';
import FastImage from 'react-native-fast-image';
import {
  F_SIZE_TEXT,
  F_SIZE_Y_BIGTEXT,
  F_SIZE_Y_TEXT,
} from '../../config/Font';
import {korDateFormatString} from '../../utils/common/TimeFormat';

type nftFrontProps = {
  width: number;
  height: number;
  poster: string;
  title: string;
  date: string;
  location: string;
  row: string;
  no: string;
};
/**
 * NftFront 입니다.
 * @param props
 * - poster: 포스터 이미지
 * - title: 제목
 * - date: 관람일
 * - location: 공연장
 * - row: 좌석 열
 * - no: 좌석 번호
 * @returns
 * @author 김형민
 */
export default function NftFront(props: nftFrontProps) {
  return (
    <View
      style={{...styles.container, width: props.width, height: props.height}}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{uri: props.poster}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
      <View style={styles.textCard}>
        <View style={styles.title}>
          <Text style={F_SIZE_Y_BIGTEXT}>{props.title}</Text>
        </View>
        <View style={styles.contentCard}>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>location</Text>
            <Text style={F_SIZE_TEXT}>{props.location}</Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>date</Text>
            <Text style={F_SIZE_TEXT}>{korDateFormatString(props.date)}</Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>row</Text>
            <Text style={F_SIZE_TEXT}>{props.row}</Text>
          </View>
          <View style={styles.content}>
            <Text style={F_SIZE_Y_TEXT}>no</Text>
            <Text style={F_SIZE_TEXT}>{props.no}</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
              borderRadius: widthPercent(20),
            }}>
            <Text style={F_SIZE_Y_TEXT}>응모 가능</Text>
          </View>
        </View>
      </View>
      {/* 
      제목, 날짜, 티켓주소, 수수료,  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 3,
    borderRadius: widthPercent(20),
  },
  image: {
    flex: 1,
    borderRadius: widthPercent(20),
  },
  textCard: {
    flex: 2,
    padding: widthPercent(10),
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    flex: 3,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
