import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {CARDBASE, MAINBLACK, MAINGRAY, MAINYELLOW} from '../../config/Color';
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
import SeatCompetition from './SeatCompetition';
import SeatSum from './SeatSum';
import {Dropdown} from '../dropdown/Dropdown';
import {PopUpModal} from '../modal/Modal';
import {userInfoByWallet} from '../../api/web3/did';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../../utils/recoil/Atoms';

export default function GaArea({
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

  //현재 유저의 정보
  const userInfo = useRecoilValue(userInfoState);
  //현재 유저의 지갑 주소 세팅
  const userWallet = userInfo ? userInfo.walletAddress : null;

  useEffect(() => {
    // console.log('구역', showID);
    const fetchFamilyMembersInfo = async () => {
      const myInfo = await userInfoByWallet(userWallet);
      console.log('가져온 내정보는', myInfo);
      console.log('가져ㅛㄱ', families);
      console.log('유저', userInfo?.user_id);
      console.log('바이아이디', families.buyer_id);

      const membersData = await Promise.all(
        families.map(async family => {
          const userInfo = await userInfoByWallet(family.owner_wallet);
          return {
            id: family.owner_id, // id를 사용합니다.
            label: userInfo.name, // userInfoByWallet 응답에서 name을 사용합니다.
            value: family.owner_wallet, // buyer_wallet을 사용합니다.
            userName: userInfo.name, // userInfoByWallet 응답에서 name을 사용합니다.
            owner_id: family.owner_id, // 추가
            owner_wallet: family.owner_wallet, // 추가
            owner_fingerprint_key: family.owner_fingerprint_key, // 추가
          };
        }),
      );
      // 현재 유저의 정보를 첫 번째 요소로 추가
      const currentUserData = {
        id: userInfo?.user_id, // 현재 유저의 ID (현재 유저는 구매하려는 사람임)
        label: myInfo.name, // 현재 유저의 이름
        value: userWallet, // 현재 유저의 지갑 주소
        userName: myInfo.name, // 현재 유저의 이름
        owner_id: userInfo?.user_id, // 현재 유저는 구매하려는 사람임
        owner_fingerprint_key: biometricKey,
      };
      console.log('현재유저', currentUserData);
      setFamilyMembersDropdownData([currentUserData, ...membersData]);

      // console.log('저장 전 memberData', membersData);
      console.log('d응응', familyMembersDropdownData);
      // setFamilyMembersDropdownData(membersData);
    };

    fetchFamilyMembersInfo();
  }, [families]);

  const handleItemSelect = selectedValue => {
    setSelectedDrop(selectedValue);
    console.log(selectedDrop);
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
    console.log(memberInfo);

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
        <Text style={F_SIZE_Y_BIGTEXT}>{seatInfo.userName}</Text>
        <Text style={F_SIZE_BIGTEXT}>
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
