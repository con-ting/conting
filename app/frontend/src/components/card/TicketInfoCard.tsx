import {StyleSheet, Text, View} from 'react-native';
import {heightPercent} from '../../config/Dimensions';
import {F_SIZE_SMALLTEXT, F_SIZE_TEXT, F_SIZE_Y_TEXT} from '../../config/Font';
import {korDateFormatString} from '../../utils/common/TimeFormat.ts';

type ticketInfoProps = {
  title?: string;
  date?: string;
  location?: string;
  row?: string;
  no?: string;
};

/**
 * TicketInfoCard 입니다.
 * @param props
 * - title?: 제목
 * - date?: 관람일
 * - location?: 공연장
 * - row?: 좌석 열
 * - no?: 좌석 번호
 * @returns
 * @author 강성권, 김형민
 */
export default function TicketInfoCard(props: ticketInfoProps) {
  return (
    <View style={styles.infoCard}>
      <View
        style={{
          marginBottom: heightPercent(15),
        }}>
        <Text style={F_SIZE_Y_TEXT}>
          {props.title ? props.title : 'WORLD TOUR CONCERT'}
        </Text>
      </View>
      <View style={styles.textCard}>
        <Text style={F_SIZE_TEXT}>Date</Text>
        <Text style={F_SIZE_SMALLTEXT}>
          {props.date ? korDateFormatString(props.date) : '2024년 3월 15일'}
        </Text>
      </View>
      <View style={styles.textCard}>
        <Text style={F_SIZE_TEXT}>Location</Text>
        <Text style={F_SIZE_SMALLTEXT}>
          {props.location ? props.location : '광주염주체육관'}
        </Text>
      </View>
      <View style={styles.textCard}>
        <Text style={F_SIZE_TEXT}>Row</Text>
        <Text style={F_SIZE_SMALLTEXT}>{props.row ? props.row : '가'}</Text>
      </View>
      <View style={styles.textCard}>
        <Text style={F_SIZE_TEXT}>No</Text>
        <Text style={F_SIZE_SMALLTEXT}>{props.no ? props.no : '15'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    height: heightPercent(130),
    padding: heightPercent(15),
    backgroundColor: '#383838',
    borderTopStartRadius: 1,
    borderTopEndRadius: 1,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    opacity: 0.9,
  },
  textCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
