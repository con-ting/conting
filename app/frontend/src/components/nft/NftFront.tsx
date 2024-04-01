import {ImageBackground, StyleSheet, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import TicketInfoCard from '../card/TicketInfoCard';
import FastImage from 'react-native-fast-image';

type nftFrontProps = {
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
    <View style={styles.container}>
      <FastImage
        source={{
          uri: props.poster,
        }}
        style={styles.image}>
        <TicketInfoCard
          title={props.title}
          date={props.date}
          location={props.location}
          row={props.row}
          no={props.no}
        />
      </FastImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercent(250),
    height: heightPercent(500),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(130, 156, 199, 0.6)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 20,
    resizeMode: 'stretch',
  },
});
