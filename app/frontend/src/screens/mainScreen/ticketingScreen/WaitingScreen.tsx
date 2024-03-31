import {StyleSheet, View, Text} from 'react-native';

import {
  F_SIZE_BIGTEXT,
  F_SIZE_HEADER,
  F_SIZE_Y_HEADER,
} from '../../../config/Font';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {queueGetApi} from '../../../api/queue/queue';
import {
  biometricsAuth,
  checkKey,
  createKey,
  deleteKey,
} from '../../../utils/biometric/Biometrics';

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
  const [currentRank, setCurrentRank] = useState(route.params.rank);
  const navigation = useNavigation(); // 네비게이션 객체 사용
  const intervalId = useRef(null); // intervalId를 위한 ref 생성

  useEffect(() => {
    // const handleBiometricAuth = async () => {
    //   try {
    //     const hasKey = await checkKey();
    //     let signatureKey;

    //     if (hasKey) {
    //       console.log('해시키', hasKey);
    //       const bioAuthResult = await biometricsAuth();
    //       // id,
    //       // '지문 인증을 위해 인증해주세요.',
    //       if (!bioAuthResult.result) {
    //         await deleteKey();
    //         const keyCreationResult = await createKey();
    //         if (!keyCreationResult.result) {
    //           console.log('새 키 생성 실패');
    //           return;
    //         }
    //         signatureKey = await biometricsAuth();
    //         // id,
    //         // '지문 인증을 위해 인증해주세요.',
    //       } else {
    //         signatureKey = bioAuthResult;
    //       }
    //     } else {
    //       const keyCreationResult = await createKey();
    //       if (!keyCreationResult.result) {
    //         console.log('키 생성 실패');
    //         return;
    //       }
    //       signatureKey = await biometricsAuth();
    //       // id,
    //       // '지문 인증을 위해 인증해주세요.',
    //     }

    //     if (signatureKey && signatureKey.result) {
    //       console.log('서명 키 생성 성공', signatureKey.key);
    //       navigation.navigate('SeatArea', {
    //         biometricKey: signatureKey.key,
    //         scheduleID: id,
    //       });
    //     } else {
    //       console.log('서명 키 생성 실패');
    //     }
    //   } catch (error) {
    //     console.error('지문 인증 처리 중 오류 발생:', error);
    //   }
    // };

    const fetchQueueStatus = async () => {
      try {
        const status = await queueGetApi(id);
        if (status.rank <= 0) {
          setCurrentRank(0);
          clearInterval(intervalId.current);

          // 대기열이 없으면 지문 인증 로직 실행
          // handleBiometricAuth();
          navigation.navigate('SeatArea', {
                    // biometricKey: signatureKey.key,
                    scheduleID: id,
                  });
        } else {
          setCurrentRank(status.rank);
          console.log('대기열 조회 완료:', status);
        }
      } catch (error) {
        console.error('대기열 조회 실패: ', error);
      }
    };

    // fetchQueueStatus(); // 컴포넌트가 마운트될 때 한 번 호출
    intervalId.current = setInterval(fetchQueueStatus, 3000); // 3초마다 반복

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current); // 컴포넌트가 언마운트될 때 인터벌 제거
      }
    };
  }, [id, navigation]); // id와 navigation이 변경될 때 useEffect를 다시 실행

  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <Text style={F_SIZE_HEADER}>현재 대기 인원</Text>
      </View>
      <View style={styles.context}>
        <Text style={F_SIZE_Y_HEADER}>{currentRank} 명</Text>
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
