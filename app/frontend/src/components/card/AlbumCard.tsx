import {View, Text, Image, StyleSheet} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';

export type albumProps = {
  name: string;
  title?: string;
  album: string;
  published_at?: string;
};

/**
 * 앨범 카드입니다.
 * @param props
 * @returns
 * @author 강성권
 */

const AlbumCard = (props: albumProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        source={{uri: props.album}}
      />
      <View
        style={{
          flex: 2,
          padding: widthPercent(20),
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.text}>발매일 : {props.published_at}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    marginBottom: heightPercent(10),
    height: heightPercent(180),
  },
  title: {
    color: 'white',
    fontSize: fontPercent(20),
    fontFamily: 'Jalnan2TTF',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: fontPercent(12),
    fontFamily: 'Jalnan2TTF',
  },
});

export default AlbumCard;
