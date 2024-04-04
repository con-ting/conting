import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  F_SIZE_BIGTEXT,
  F_SIZE_B_TITLE,
  F_SIZE_TEXT,
  F_SIZE_TITLE,
  F_SIZE_Y_BIGTEXT,
  F_SIZE_Y_BTITLE,
} from '../../config/Font';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {CARDBASE, MAINYELLOW} from '../../config/Color';
import {useEffect, useState} from 'react';
import {PopUpModal} from '../modal/Modal';
import SeatSum from './SeatSum';
import {Dropdown} from '../dropdown/Dropdown';
import {userInfoByWallet} from '../../api/web3/did';

export default function NaArea({
  userID,
  seatsData,
  showID,
  scheduleID,
  biometricKey,
  families,
}) {
  const [selectedSeats, setSelectedSeats] = useState({});

  // 드롭다운 오픈 상태
  const [dropDownOpen, setDropDownOpen] = useState(false);
  // 선택한 드롭다운 라벨
  const [selectedDrop, setSelectedDrop] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [familyMembersDropdownData, setFamilyMembersDropdownData] = useState(
    [],
  );
  // const familyMembers = [
  //   {id: userID, label: '본인', value: '본인', userName: '김싸피'},
  //   {id: 2, label: '어머니', value: '어머니', userName: '김엄마'},
  //   {id: 3, label: '아버지', value: '아버지', useNrame: '김아빠'},
  //   {id: 4, label: '누나', value: '누나', userName: '김누나'},
  // ];
  useEffect(() => {
    // console.log('구역', showID);
    const fetchFamilyMembersInfo = async () => {
      const membersData = await Promise.all(
        families.map(async (family: {buyer_wallet: string}) => {
          const userInfo = await userInfoByWallet(family.buyer_wallet);
          console.log('유저정보', userInfo);
          return {
            id: family.buyer_id, // buyer_id를 사용합니다.
            label: userInfo.name, // userInfoByWallet 응답에서 name을 사용합니다.
            value: family.buyer_wallet, // buyer_wallet을 사용합니다.
            userName: userInfo.name, // userInfoByWallet 응답에서 name을 사용합니다.
            owner_id: family.owner_id, // 추가
            owner_wallet: family.owner_wallet, // 추가
            owner_fingerprint_key: family.owner_fingerprint_key, // 추가
          };
        }),
      );
      setFamilyMembersDropdownData(membersData);
    };

    fetchFamilyMembersInfo();
  }, [families]);

  const handleItemSelect = selectedValue => {
    setSelectedDrop(selectedValue);
  };

  const isSeatSelectedByOthers = seatId => {
    return Object.entries(selectedSeats).some(
      ([key, value]) => value.seatId === seatId && key !== selectedDrop,
    );
  };

  const handleSeatPress = (
    seatId: string,
    seatRow: string,
    seatCol: string,
  ) => {
    if (!selectedDrop || isSeatSelectedByOthers(seatId)) {
      // 드롭다운 미선택 상태이거나 다른 구성원이 이미 선택한 좌석인 경우
      setIsModalVisible(true);
      return;
    }

    // seatsData에서 좌석을 찾아 등급 정보를 얻기
    const seatData = seatsData.find(seat => seat.seat_id === seatId);
    const seatGrade = seatData ? seatData.grade : 'Unknown';
    const gradePrice = seatData ? seatData.grade_price : 0;
    const memberInfo = familyMembersDropdownData.find(
      member => member.value === selectedDrop,
    );
    const userName = memberInfo ? memberInfo.userName : '알 수 없음';
    const memberId = memberInfo ? memberInfo.id : null;

    setSelectedSeats(prevSelectedSeats => ({
      ...prevSelectedSeats,
      [selectedDrop]: {
        seatId,
        seatRow,
        seatCol,
        seatGrade,
        gradePrice,
        userName: memberInfo ? memberInfo.userName : '알 수 없음',
        memberId: memberInfo ? memberInfo.id : null,
        owner_id: memberInfo ? memberInfo.owner_id : null, // 추가
        owner_wallet: memberInfo ? memberInfo.owner_wallet : '', // 추가
        owner_fingerprint_key: memberInfo
          ? memberInfo.owner_fingerprint_key
          : '',
      },
    }));
  };

  const renderSelectedSeats = () => {
    return Object.entries(selectedSeats).map(([member, seatInfo]) => (
      <View key={member} style={styles.selectedSeatInfo}>
        <Text style={F_SIZE_Y_BTITLE}>{seatInfo.userName}</Text>
        <Text style={F_SIZE_TITLE}>
          구역 - {seatInfo.seatGrade} / {seatInfo.seatRow}열 /{' '}
          {seatInfo.seatCol}번
        </Text>
      </View>
    ));
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
              selectedSeats[selectedDrop]?.seatId === seat.seat_id &&
                styles.selectedSeat,
              isSeatSelectedByOthers(seat.seat_id) && styles.selectedSeat, // 이 부분을 추가하여 다른 구성원이 선택한 좌석 표시
            ]}
            disabled={
              !seat.is_available || isSeatSelectedByOthers(seat.seat_id)
            }
            onPress={() => handleSeatPress(seat.seat_id, row, seat.col)}>
            <Text
              style={[
                styles.seatText,
                selectedSeats[selectedDrop]?.seatId === seat.seat_id &&
                  styles.selectedSeatText,
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
      <PopUpModal
        children={
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <Text style={[F_SIZE_B_TITLE, styles.alert]}>
                먼저 가족을 선택하세요.
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={[F_SIZE_Y_BIGTEXT, styles.close]}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
      <View style={styles.container}>
        <Dropdown
          data={familyMembersDropdownData}
          placeholder="가족선택"
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          onSelectValue={handleItemSelect}
          width={widthPercent(120)}
          textSize={14}
        />
        <View style={styles.space} />
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
      <View>{renderSelectedSeats()}</View>

      <View>
        <SeatSum
          selectedSeats={selectedSeats}
          seatsData={seatsData}
          showID={showID}
          scheduleID={scheduleID}
          biometricKey={biometricKey}
        />
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

  selectedSeatInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: CARDBASE,
    padding: 10,
  },
  modal: {
    height: heightPercent(50),
  },
  close: {
    textAlign: 'right',
  },
  alert: {
    textAlign: 'center',
  },
  modalView: {
    gap: 20,
    // alignItems: "center",
  },
  space: {
    marginTop: widthPercent(10),
  },
});
