import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {Clock, Music} from 'iconsax-react-native';
import {TEXTGRAY} from '../../config/Color';
import {F_SIZE_Y_BIGTEXT} from '../../config/Font';

export type albumProps = {
  name: string;
  title?: string;
  album: string;
  published_at?: string;
  songNums: number;
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
          justifyContent: 'space-around',
        }}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.name}
        </Text>
        <View>
          <View style={styles.row}>
            <Clock size={16} color={TEXTGRAY} />
            <Text style={styles.text}>발매일 : {props.published_at}</Text>
          </View>
          <View style={styles.row}>
            <Music size={16} color={TEXTGRAY} />
            <Text style={styles.text}>{props.songNums} 곡</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={F_SIZE_Y_BIGTEXT}>앨범듣기</Text>
        </TouchableOpacity>
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
    height: heightPercent(160),
  },
  title: {
    color: 'white',
    fontSize: fontPercent(20),
    fontFamily: 'Jalnan2TTF',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: fontPercent(14),
    fontFamily: 'Jalnan2TTF',
  },
  row: {
    flexDirection: 'row',
    gap: widthPercent(6),
  },
  button: {
    width: widthPercent(100),
    height: heightPercent(16),
  },
});

export default AlbumCard;
