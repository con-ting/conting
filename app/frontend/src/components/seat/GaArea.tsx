import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MAINBLACK, MAINYELLOW} from '../../config/Color';
import {F_SIZE_BIGTEXT} from '../../config/Font';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import SeatCompetition from './SeatCompetition';
import SeatSum from './SeatSum';

export default function GaArea({seatsData}: any) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lastSelectedSeatId, setLastSelectedSeatId] = useState<string | null>(
    null,
  );

  const handleSeatPress = (seatId: number, isAvailable: any) => {
    if (isAvailable) {
      setLastSelectedSeatId(seatId); // 함수 호출 시 가장 최근 선택한 좌석의 아이디가 들어감
      setSelectedSeats(prevSelectedSeats => {
        if (prevSelectedSeats.includes(seatId)) {
          const newSelectedSeats = prevSelectedSeats.filter(
            id => id !== seatId,
          );
          // 선택 해제 시 lastSelectedSeatId 업데이트
          setLastSelectedSeatId(
            newSelectedSeats.length > 0
              ? newSelectedSeats[newSelectedSeats.length - 1]
              : null,
          );
          return newSelectedSeats;
        } else {
          // 새로운 좌석을 선택한 경우
          setLastSelectedSeatId(seatId);
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
              selectedSeats.includes(seat.seat_id) && styles.selectedSeat,
            ]}
            disabled={!seat.is_available}
            onPress={() => handleSeatPress(seat.seat_id, seat.is_available)}>
            <Text
              style={[
                styles.seatText,
                selectedSeats.includes(seat.seat_id) && styles.selectedSeatText,
                !seat.is_available && styles.reservedSeatText,
              ]}>
              {seat.col}
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
      {/* <View>
        <SeatCompetition
          lastSelectedSeatId={lastSelectedSeatId}
          seatsData={seatsData}
        />
      </View> */}
      <View>
        <SeatSum selectedSeats={selectedSeats} seatsData={seatsData} />
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
