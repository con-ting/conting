import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_TITLE} from '../../config/Font';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {MAINBLACK, MAINWHITE} from '../../config/Color';
import {SimpleInput} from '../input/input';

export default function ConcertRegistInputList() {
  const sections = ['A', 'B', 'C']; // 구역 라벨 배열

  // 각 행을 구성하는 컴포넌트를 렌더링
  const renderRows = sections => {
    const rows = [];
    for (let i = 0; i < sections.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={F_SIZE_TITLE}>{sections[i]}</Text>
            <SimpleInput
              width={widthPercent(100)}
              backGroundColor={MAINWHITE}
              textColor={MAINBLACK}
            />
          </View>
          {sections[i + 1] && ( // 다음 요소가 있으면 렌더링합니다.
            <View style={styles.inputContainer}>
              <Text style={F_SIZE_TITLE}>{sections[i + 1]}</Text>
              <SimpleInput
                width={widthPercent(100)}
                backGroundColor={MAINWHITE}
                textColor={MAINBLACK}
              />
            </View>
          )}
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
