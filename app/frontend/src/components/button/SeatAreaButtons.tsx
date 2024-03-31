import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MAINYELLOW} from '../../config/Color';
import {F_SIZE_B_BUTTON} from '../../config/Font';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {useEffect, useState} from 'react';
import SeatMap from '../seat/SeatMap';
import GaArea from '../seat/GaArea';
import NaArea from '../seat/NaArea';
import DaArea from '../seat/DaArea';
import {SeatApi} from '../../api/seat/Seat';
// import seatsData from '../data/seatsData';

export default function SeatAreaButtons({biometricKey, scheduleID}) {
  const [selectedArea, setSelectedArea] = useState('');
  const [seatsData, setSeatsData] = useState([]); // 좌석 데이터 저장

  useEffect(() => {
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

    fetchSeats();
  }, [scheduleID, selectedArea]);
  const renderArea = () => {
    switch (selectedArea) {
      case '가':
        return <GaArea seatsData={seatsData} />;
      case '나':
        return <NaArea seatsData={seatsData} />;
      case '다':
        return <DaArea seatsData={seatsData} />;
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
