import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MAINBLACK, MAINYELLOW} from '../../config/Color';
import {F_SIZE_BIGTEXT} from '../../config/Font';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';

export default function SeatMap({seatsData}: any) {
  //사용자가 선택한 좌석의 ID를 저장하는 상태
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 좌석 선택 핸들러
  const handleSeatPress = (seatId: never, isAvailable: any) => {
    if (isAvailable) {
      setSelectedSeats(prevSelectedSeats => {
        // 이미 선택된 좌석이면 선택 해제, 그렇지 않으면 추가
        if (prevSelectedSeats.includes(seatId)) {
          return prevSelectedSeats.filter(id => id !== seatId);
        } else {
          return [...prevSelectedSeats, seatId];
        }
      });
    }
  };

  // 알파벳 행과 숫자 행을 분리하는 로직
  const alphaRows = seatsData.filter((seat: {row: any}) =>
    isNaN(Number(seat.row)),
  );
  const numberRows = seatsData.filter(
    (seat: {row: any}) => !isNaN(Number(seat.row)),
  );

  // 주어진 좌석 데이터로부터 좌석 UI 생성하는 함수
  const renderSeatsByRow = (seats: any[]) => {
    // 행(row)별로 좌석을 그룹화합니다.
    const groupedSeats = seats.reduce((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});

    return Object.entries(groupedSeats).map(([row, seats]) => (
      <View key={row} style={styles.row}>
        {seats.map(seat => (
          <TouchableOpacity
            key={seat.id}
            style={[
              styles.seat,
              !seat.is_available && styles.reservedSeat,
              selectedSeats.includes(seat.id) && styles.selectedSeat, //사용자가 선택한 좌석
            ]}
            disabled={!seat.is_available}
            onPress={() => handleSeatPress(seat.id, seat.is_available)}>
            <Text
              style={[
                styles.seatText,
                selectedSeats.includes(seat.id) && styles.selectedSeatText, // 선택한 좌석의 텍스트 스타일
                !seat.is_available && styles.reservedSeatText, // 예약된 좌석의 텍스트 스타일
              ]}>
              {seat.column}
            </Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.rowLabel}>{row}열</Text>
      </View>
    ));
  };

  return (
    <>
      <View style={styles.container}>
        {renderSeatsByRow(alphaRows)}
        <View style={styles.separator} />
        {renderSeatsByRow(numberRows)}
      </View>
      <View style={styles.row}>
        <View style={styles.available} />
        <Text style={F_SIZE_BIGTEXT}>Available</Text>
        <View style={styles.reserved} />
        <Text style={F_SIZE_BIGTEXT}>Reserved</Text>
        <View style={styles.selected} />
        <Text style={F_SIZE_BIGTEXT}>Selected</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercent(340),
    backgroundColor: MAINBLACK,
    alignItems: 'flex-end',
    paddingVertical: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowLabel: {
    width: widthPercent(30),
    marginLeft: 3,
    fontFamily: 'Jalnan2TTF',
    color: '#FFFFFF',
    fontSize: fontPercent(14),
  },
  numberedRow: {
    marginTop: 10,
  },

  seatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seat: {
    width: widthPercent(30),
    height: heightPercent(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderColor: '#9A9B79',
    borderWidth: 2,
    margin: 2,
  },
  reservedSeat: {
    backgroundColor: '#877F6C',
  },
  seatText: {
    color: '#BFBFBF',
    fontFamily: 'Jalnan2TTF',
  },
  separator: {
    height: heightPercent(60),
  },
  reservedSeatText: {
    color: '#FCC434',
    fontFamily: 'Jalnan2TTF',
  },
  selectedSeat: {
    backgroundColor: '#FCC434',
  },
  selectedSeatText: {
    color: 'black',
    fontFamily: 'Jalnan2TTF',
  },

  available: {
    width: widthPercent(30),
    height: heightPercent(30),
    borderRadius: 4,
    backgroundColor: '#1C1C1C',
  },
  reserved: {
    width: widthPercent(30),
    height: heightPercent(30),
    borderRadius: 4,
    backgroundColor: '#877F6C',
  },
  selected: {
    width: widthPercent(30),
    height: heightPercent(30),
    borderRadius: 4,
    backgroundColor: MAINYELLOW,
  },
});
