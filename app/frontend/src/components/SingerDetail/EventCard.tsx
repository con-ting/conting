import {View, Text, Image, StyleSheet} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {BLUEBASE, MAINYELLOW} from '../../config/Color';


export type cardProps = {
  name: string;
  img_url?: string;
  start_at?: string;
  end_at?: string;
};

/**
 * Event 카드입니다.
 * @param props
 * @returns
 * @author 강성권
 */

export default function EventCard(props: cardProps) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          blurRadius = {10}
          source={{
            uri: props.img_url,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            color: BLUEBASE,
            fontSize: fontPercent(20),
            fontFamily: 'Jalnan2TTF',
          }}>
          응모 예정
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          padding: widthPercent(20),
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.text}>실시간 응모현황 : 2500명</Text>
        <Text style={styles.text}>상품 개수 : 100개</Text>
        <Text style={styles.text}>응모 시작 : {props.start_at}</Text>
        <Text style={styles.text}>응모 마감 : {props.end_at}</Text>
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
    color: MAINYELLOW,
    fontSize: fontPercent(20),
    fontFamily: 'Jalnan2TTF',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: fontPercent(12),
    fontFamily: 'Jalnan2TTF',
  },
});
