import {Image, StyleSheet, Text, View} from 'react-native';
import {F_SIZE_HEADER} from '../../../config/Font';
import {MAINBLACK} from '../../../config/Color';
import {YellowButton} from '../../../components/button/Button';

import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {heightPercent, widthPercent} from '../../../config/Dimensions';

export default function ResultScreen({route}) {
  const [paySuccess, setPaySuccess] = useState(true); // 결제 성공 여부
  const [reservationType, setReservationType] = useState('추첨'); // 예매 방식

  const navigation = useNavigation();

  // 결제 성공 화면
  const renderSuccess = () => {
    if (reservationType === '선착순') {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image
              source={require('../../../assets/gif/success3.gif')}
              style={styles.img}
            />
            <Text style={F_SIZE_HEADER}>예매 성공!</Text>
          </View>
          <View style={styles.button}>
            <YellowButton
              onPress={() => navigation.navigate('입장권')}
              width={'90%'}
              btnText="내 티켓 보러가기"
              textSize={20}
              isRadius
            />
          </View>
        </View>
      );
    } else if (reservationType === '추첨') {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Image
              source={require('../../../assets/gif/success.gif')}
              style={styles.img}
            />
            <Text style={F_SIZE_HEADER}>응모 완료!</Text>
          </View>
          <View style={styles.button}>
            <YellowButton
              onPress={() => navigation.navigate('추첨결과')}
              width={'90%'}
              btnText="응모 내역 보기"
              textSize={20}
              isRadius
            />
          </View>
        </View>
      );
    }
  };

  // 결제 실패 화면
  const renderFail = () => (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={require('../../../assets/gif/fail.gif')}
          style={styles.img}
        />
        <Text style={F_SIZE_HEADER}>예매 실패</Text>
      </View>
      <View style={styles.button}>
        <YellowButton
          onPress={() => navigation.goBack()} // 이전 화면으로 돌아가기
          width={'90%'}
          btnText="다시 예매하기"
          textSize={20}
          isRadius
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {paySuccess ? renderSuccess() : renderFail()}
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
