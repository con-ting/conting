import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MAINYELLOW} from '../../config/Color';
import {F_SIZE_B_BUTTON} from '../../config/Font';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {useEffect, useState} from 'react';
import GaArea from '../seat/GaArea';
import NaArea from '../seat/NaArea';
import DaArea from '../seat/DaArea';
import {SeatApi} from '../../api/seat/Seat';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '../../utils/recoil/Atoms';
import {findFamilyListForPurchaseByShowId} from '../../api/web3/did';

export default function SeatAreaButtons({biometricKey, scheduleID, showID}) {
  const [selectedArea, setSelectedArea] = useState('');
  const [families, setFamilies] = useState([]);
  const [seatsData, setSeatsData] = useState([]); // 좌석 데이터 저장
  const userInfo = useRecoilValue(userInfoState);
  const userID = userInfo ? userInfo.user_id : null;

  useEffect(() => {
    console.log('아이디2', showID);
    console.log('스케줄아이디', scheduleID);
    const fetchSeats = async () => {
      if (selectedArea) {
        const sectorMapping = {가: 'GA', 나: 'NA', 다: 'DA'};
        const sector = sectorMapping[selectedArea];
        if (sector) {
          console.log('가져올 구역: ', sector);
          const response = await SeatApi({schedule_id: scheduleID, sector});
          console.log('가져온 구역의 데이터: ', response);
          setSeatsData(response.seats);
        }
      }
    };
    // 예매 부탁받은 가족이 있는지 조회
    const fetchFamilies = async () => {
      try {
        const familyList = await findFamilyListForPurchaseByShowId({
          showId: showID,
        });
        console.log('받아온 가족 목록', familyList);
        setFamilies(familyList);
      } catch (error) {
        console.error('가족 목록 조회 중 오류 발생: ', error);
      }
    };

    fetchSeats();
    fetchFamilies();
  }, [scheduleID, selectedArea]);
  const renderArea = () => {
    switch (selectedArea) {
      case '가':
        return (
          <GaArea
            userID={userID}
            seatsData={seatsData}
            showID={showID}
            scheduleID={scheduleID}
            biometricKey={biometricKey}
            families={families}
          />
        );
      case '나':
        return (
          <NaArea
            userID={userID}
            seatsData={seatsData}
            showID={showID}
            scheduleID={scheduleID}
            biometricKey={biometricKey}
            families={families}
          />
        );
      case '다':
        return (
          <DaArea
            userID={userID}
            seatsData={seatsData}
            showID={showID}
            scheduleID={scheduleID}
            biometricKey={biometricKey}
            families={families}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedArea('가')}>
            <Text style={F_SIZE_B_BUTTON}>가</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedArea('나')}>
            <Text style={F_SIZE_B_BUTTON}>나</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedArea('다')}>
            <Text style={F_SIZE_B_BUTTON}>다</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.seatsContainer}>
          {renderArea()}
          {/* {selectedArea && <SeatMap seatsData={mockSeatsData[selectedArea]} />} */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    backgroundColor: MAINYELLOW,
    borderRadius: 5,
    width: widthPercent(80),
    height: heightPercent(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatsContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
});
