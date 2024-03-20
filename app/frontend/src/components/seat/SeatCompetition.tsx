import {StyleSheet, Text, View} from 'react-native';
import {F_SIZE_TITLE, F_SIZE_Y_HEADER, F_SIZE_Y_TITLE} from '../../config/Font';
import seatsData from '../data/seatsData';

type CompetitionProps = {
  lastSelectedSeatId: string | null;
  seatsData: Array<{
    id: string;
    row: string;
    column: string;
    competition: number;
  }>;
};

/**
 * Competition(선택한 좌석의 경쟁률)입니다.
 * @param props
 * - lastSelectedSeatId: 마지막으로 선택한 좌석의 아이디
 * - seatsData: 경쟁률을 가져오기 위한 전체 좌석 데이터
 * @returns
 * @author 전상혁
 */

export default function SeatCompetition(props: CompetitionProps) {
  // 선택한 좌석이 없다면 표시하지 않음
  if (!props.lastSelectedSeatId) return null;
  // 전체 좌석 데이터 중 선택한 좌석의 아이디 비교하여 찾았으면 저장
  const seat = props.seatsData.find(s => s.id === props.lastSelectedSeatId);
  //   if (!seat) return null; // 선택한 좌석이 데이터에 없는 경우

  return (
    <View style={styles.container}>
      <Text style={F_SIZE_TITLE}>좌석 경쟁률</Text>
      <Text style={F_SIZE_Y_HEADER}>{seat.competition} : 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
