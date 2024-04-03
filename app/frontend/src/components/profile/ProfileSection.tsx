import {Image, StyleSheet, Text, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_TITLE} from '../../config/Font';
import {YellowButton} from '../button/Button';
import {logout} from '../../api/auth/auth.ts';
import {useRecoilState} from 'recoil';
import {goMainPageState} from '../../utils/recoil/Atoms.ts';

export default function ProfileSection({name}: any) {
  const [goMainPage, setGoMainPage] = useRecoilState(goMainPageState);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/profile.png')}
        style={styles.picture}
      />
      <Text style={F_SIZE_TITLE}>{name}</Text>
      <YellowButton
        onPress={async () => {
          await logout();
          setGoMainPage(false);
        }}
        width={'40%'}
        btnText="로그아웃"
        textSize={12}
        isRadius
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 44,
  },
  picture: {
    width: widthPercent(100),
    height: heightPercent(100),
    borderRadius: 50,
  },
});
