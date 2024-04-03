import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_TITLE} from '../../config/Font';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {MAINBLACK, MAINWHITE} from '../../config/Color';
import {SimpleInput} from '../input/input';
import {useEffect, useState} from 'react';

export default function ConcertRegistInputList({onPricesChange}) {
  const sections = ['A', 'B', 'C']; // 구역 라벨 배열
  const [prices, setPrices] = useState({A: '', B: '', C: ''}); // 구역별 가격 상태

  useEffect(() => {
    // 구역별 가격이 변경될 때마다 상위 컴포넌트로 전달
    onPricesChange(prices);
  }, [prices]);

  // 입력값 변경 핸들러
  const handlePriceChange = (section, value) => {
    setPrices(prevPrices => ({...prevPrices, [section]: value}));
  };

  // 각 행을 구성하는 컴포넌트를 렌더링
  const renderRows = sections => {
    const rows = [];
    for (let i = 0; i < sections.length; i++) {
      rows.push(
        <View key={sections[i]} style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={F_SIZE_TITLE}>{sections[i]}</Text>
            <SimpleInput
              width={widthPercent(100)}
              backGroundColor={MAINWHITE}
              textColor={MAINBLACK}
              onChangeText={value => handlePriceChange(sections[i], value)}
              value={prices[sections[i]]}
            />
          </View>
        </View>,
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <View>{renderRows(sections)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: heightPercent(150),
    // backgroundColor: 'white',
    // width: widthPercent(300),
    // alignItems: 'center',
  },
  context: {
    margin: 20,
  },
  row: {
    alignItems: 'center',
    gap: 20,
    flexDirection: 'row',
    marginBottom: 14,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    width: widthPercent(170), // SimpleInput 너비 + 간격
  },
});
