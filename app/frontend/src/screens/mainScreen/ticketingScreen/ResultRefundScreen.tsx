import {Image, StyleSheet, Text, View} from 'react-native';
import {F_SIZE_HEADER} from '../../../config/Font';
import {MAINBLACK} from '../../../config/Color';
import {YellowButton} from '../../../components/button/Button';

import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {heightPercent, widthPercent} from '../../../config/Dimensions';

export default function ResultRefundScreen({route}) {
  const [refundSuccess, setRefundSuccess] = useState(route.params.refundResult); // 환불 성공 여부

  const navigation = useNavigation();

  // 환불 성공 화면
  const renderSuccess = () => {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            source={require('../../../assets/gif/success3.gif')}
            style={styles.img}
          />
          <Text style={F_SIZE_HEADER}>환불 성공!</Text>
        </View>
        <View style={styles.button}>
          <YellowButton
            onPress={() => navigation.navigate('Main')}
            width={'90%'}
            btnText="메인 페이지로"
            textSize={20}
            isRadius
          />
        </View>
      </View>
    );
  };

  // 환불 실패 화면
  const renderFail = () => (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={require('../../../assets/gif/fail.gif')}
          style={styles.img}
        />
        <Text style={F_SIZE_HEADER}>환불 실패</Text>
      </View>
      <View style={styles.button}>
        <YellowButton
          onPress={() => navigation.goBack()} // 이전 화면으로 돌아가기
          width={'90%'}
          btnText="다시 환불하기"
          textSize={20}
          isRadius
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {refundSuccess ? renderSuccess() : renderFail()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
  },

  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    width: widthPercent(110),
    height: heightPercent(110),
    margin: 20,
  },
});
