import {StyleSheet, View, Text} from 'react-native';

import {
  F_SIZE_BIGTEXT,
  F_SIZE_HEADER,
  F_SIZE_Y_HEADER,
} from '../../../config/Font';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {queueGetApi} from '../../../api/queue/queue';

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
  const rank = route.params.rank;
  const id = route.params.id;
  const [currentRank, setCurrentRank] = useState(null);
  const navigation = useNavigation(); // 네비게이션 객체 사용
  const intervalId = useRef(null); // intervalId를 위한 ref 생성

  const fetchQueueStatus = async () => {
    try {
      const status = await queueGetApi(id);
      setCurrentRank(status.rank);

      // 대기열 순위가 0보다 작거나 같으면 좌석 선택 페이지로 이동
      if (status.rank <= 0) {
        navigation.navigate('SeatArea');
      } else {
        console.log('대기열 조회 완료:', status);
      }
    } catch (error) {
      console.error('대기열 조회 실패: ', error);
    }
  };

  useEffect(() => {
    fetchQueueStatus(); // 첫 렌더링에서 대기열 상태 조회
    // intervalId.current = setInterval(fetchQueueStatus, 3000); // intervalId에 인터벌 ID 저장

    return () => clearInterval(intervalId.current); // 컴포넌트 언마운트 시 인터벌 정리
  }, [id, navigation]); // 의존성 배열에 id와 navigation 추가

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
