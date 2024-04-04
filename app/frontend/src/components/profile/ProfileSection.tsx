import {Image, StyleSheet, Text, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {F_SIZE_TITLE} from '../../config/Font';
import {YellowButton} from '../button/Button';
import {logout} from '../../api/auth/auth.ts';
import {useRecoilState} from 'recoil';
import {goMainPageState} from '../../utils/recoil/Atoms.ts';
import {DETAIL3} from '../../config/Typography.tsx';
import {Spacer} from '../../utils/common/Spacer.tsx';

export default function ProfileSection(props: {name: string; wallet: string}) {
  return (
    <View style={styles.container}>
      <Text style={F_SIZE_TITLE}>{props.name}</Text>
      <Spacer space={4} />
      <DETAIL3>지갑 주소 : {props.wallet}</DETAIL3>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
