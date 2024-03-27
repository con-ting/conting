import {Image, StyleSheet, Text, View} from 'react-native';
import {F_SIZE_HEADER, F_SIZE_TITLE} from '../../config/Font';
import {MAINBLACK, MAINWHITE} from '../../config/Color';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {Sms} from 'iconsax-react-native';

export type CastInfoProps = {
  name: string;
  img: string;
  email: string;
};

/**
 * 출연진 상세 페이지에 필요한 출연진 정보입니다.
 * @param props
 * - name: 출연진 이름입니다.
 * - img: 출연진 프로필 사진 uri가 들어갑니다.
 * - email: 출연진 이메일이 들어갑니다.
 * @returns
 * @author 전상혁
 */
export default function CastInfo(props: CastInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <Image
          style={{
            width: widthPercent(90),
            height: heightPercent(90),
            borderRadius: 50,
          }}
          source={{uri: props.img}}
        />
        <View style={styles.castBox}>
          <Text style={F_SIZE_HEADER}>{props.name}</Text>
          <View style={styles.row}>
            <Sms style={styles.icon} />
            <Text style={F_SIZE_TITLE}>ssafy@ssafy.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    backgroundColor: MAINBLACK,
    // backgroundColor: 'white',
    // justifyContent: 'center',
  },
  context: {
    flexDirection: 'row',
  },
  castBox: {
    marginLeft: 20,
    gap: 10,
  },
  icon: {
    width: widthPercent(32),
    height: heightPercent(32),
    color: MAINWHITE,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});
