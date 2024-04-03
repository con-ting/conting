import {Image, StyleSheet, Text, View} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {MAINBLACK} from '../../config/Color';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type profileProps = {
  id: string;
  name: string;
  profile: string;
  backgroundNone?: boolean;
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
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CastDetail', {castId: props.id})}
      style={[
        styles.container,
        {backgroundColor: props.backgroundNone ? 'transparent' : MAINBLACK},
      ]}>
      <Image
        style={{
          width: widthPercent(80),
          height: heightPercent(80),
          borderRadius: 50,
        }}
        source={{uri: props.profile}}
      />
      <Text style={styles.title}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black', // 배경색을 검은색으로 설정
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: widthPercent(10),
  },
  title: {
    color: 'white',
    fontSize: fontPercent(16),
    marginTop: heightPercent(15),
    fontFamily: 'Jalnan2TTF',
  },
});
