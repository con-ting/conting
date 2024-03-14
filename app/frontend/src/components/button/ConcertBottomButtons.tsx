import * as React from 'react';
import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ConcertBottomButtons() {
  const [isAsk, setIsAsk] = useState(false);
  const [isTicketing, setIsTicketing] = useState(false);

  const switchColor = (buttonType: string) => {
    if (buttonType === 'ask') {
      setIsAsk(!isAsk); // '예매 부탁하기' 버튼의 상태 변경
    } else if (buttonType === 'ticketing') {
      setIsTicketing(!isTicketing); // '직접 예매하기' 버튼의 상태 변경
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FCC434', '#997000']}
        style={styles.gradientBorder}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isAsk ? '#000000' : '#FCC434'},
            {borderColor: isAsk ? '#FCC434' : '#000000'},
          ]}
          onPress={() => {
            switchColor('ask');
          }}>
          <Text style={[styles.title, {color: isAsk ? '#FCC434' : '#000000'}]}>
            예매 부탁하기
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#FCC434', '#997000']}
        style={styles.gradientBorder}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isTicketing ? '#000000' : '#FCC434'},
            {borderColor: isTicketing ? '#FCC434' : '#000000'},
          ]}
          onPress={() => {
            switchColor('ticketing');
          }}>
          <Text
            style={[
              styles.title,
              {color: isTicketing ? '#FCC434' : '#000000'},
            ]}>
            직접 예매해기
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  gradientBorder: {
    borderRadius: 35,
    margin: 10,
    padding: 2, // 이 값으로 그라데이션 테두리의 너비를 조절
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 150,
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    // borderWidth: 2,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Jalnan2TTF',
  },
});
