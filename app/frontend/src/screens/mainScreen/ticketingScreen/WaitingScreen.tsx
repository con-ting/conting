import {StyleSheet, View, Text} from 'react-native';

import {
  F_SIZE_BIGTEXT,
  F_SIZE_HEADER,
  F_SIZE_Y_HEADER,
} from '../../../config/Font';

/**
 * WaitingScreen(대기열)입니다.
 * @param props
 * - rank: 대기열 순위
 * - navigate 함수 호출할 때 객체 형태로 값을 전달받습니다.
 * - rank 값은 route 객체에서 파라미터를 route.params를 통해 추출합니다.
 * @returns
 * @author 전상혁
 */

export default function WaitingScreen({route}: any) {
  const {rank} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <Text style={F_SIZE_HEADER}>현재 대기 인원</Text>
      </View>
      <View style={styles.context}>
        <Text style={F_SIZE_Y_HEADER}>{rank} 명</Text>
      </View>
      <View style={styles.context}>
        <Text style={F_SIZE_BIGTEXT}>
          예매 처리를 위해 최선을 다하고 있습니다.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    flex: 1,
  },

  context: {
    margin: 20,
  },
});
