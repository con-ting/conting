import {Image, StyleSheet, Text, View} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';

export type profileProps = {
  name: string;
  profile: string;
};

/**
 * profile입입니다.
 * @param props
 * - name은 가수 이름
 * - profile은 가수 프로필 상세
 * @returns
 * @author 강성권
 */
export default function SingerProfile(props: profileProps) {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: widthPercent(80),
          height: heightPercent(80),
          borderRadius: 50,
        }}
        source={{uri: props.profile}}
      />
      <Text style={styles.title}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black', // 배경색을 검은색으로 설정
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: fontPercent(16),
    fontFamily: 'Jalnan2TTF',
  },
});
