import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {F_SIZE_BIGTEXT, F_SIZE_B_TITLE} from '../../config/Font';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {MAINYELLOW} from '../../config/Color';
import {useState} from 'react';

export default function NaArea({seatsData}: any) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatPress = (seatId: never, isAvailable: any) => {
    if (isAvailable) {
      setSelectedSeats(prevSelectedSeats => {
        if (prevSelectedSeats.includes(seatId)) {
          return prevSelectedSeats.filter(id => id !== seatId);
        } else {
          return [...prevSelectedSeats, seatId];
        }
      });
    }
  };

  // 알파벳 행과 숫자 행을 분리하는 로직
  const alphaRows = seatsData.filter(seat => isNaN(Number(seat.row)));
  const numberRows = seatsData.filter(seat => !isNaN(Number(seat.row)));

  // 주어진 좌석 데이터로부터 좌석 UI 생성하는 함수
  const renderSeatsByRow = (seats: any) => {
    const groupedSeats = seats.reduce((acc: any, seat: any) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});

    return Object.entries(groupedSeats).map(([row, seats]) => (
      <View key={row} style={styles.row}>
        {seats.map((seat: any) => (
          <TouchableOpacity
            key={seat.id}
            style={[
              styles.seat,
              !seat.is_available && styles.reservedSeat,
              selectedSeats.includes(seat.id) && styles.selectedSeat,
            ]}
            disabled={!seat.is_available}
            onPress={() => handleSeatPress(seat.id, seat.is_available)}>
            <Text
              style={[
                styles.seatText,
                selectedSeats.includes(seat.id) && styles.selectedSeatText,
                !seat.is_available && styles.reservedSeatText,
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
        <View style={styles.stage}>
          <Text style={F_SIZE_B_TITLE}>STAGE</Text>
        </View>
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
    // backgroundColor: 'gray',
    alignItems: 'center',
    paddingVertical: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'relative',
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
    width: widthPercent(21),
    height: heightPercent(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderColor: '#9A9B79',
    borderWidth: 2,
    // margin: 2,
  },
  reservedSeat: {
    backgroundColor: '#877F6C',
  },
  seatText: {
    color: '#BFBFBF',
    fontFamily: 'Jalnan2TTF',
  },
  separator: {
    height: heightPercent(50),
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
    backgroundColor: MAINYELLOW,
    borderRadius: 4,
  },
  stage: {
    width: widthPercent(140),
    height: heightPercent(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },
});
