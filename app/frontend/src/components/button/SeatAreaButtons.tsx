import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MAINYELLOW} from '../../config/Color';
import {F_SIZE_B_BUTTON} from '../../config/Font';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {useState} from 'react';
import SeatMap from '../seat/SeatMap';
import GaArea from '../seat/GaArea';
import NaArea from '../seat/NaArea';
import DaArea from '../seat/DaArea';
import seatsData from '../data/seatsData';

export default function SeatAreaButtons() {
  const [selectedArea, setSelectedArea] = useState('');

  const renderArea = () => {
    switch (selectedArea) {
      case '가':
        return (
          <GaArea
            seatsData={seatsData.seat.filter(seat => seat.grade === '가')}
          />
        );
      case '나':
        return (
          <NaArea
            seatsData={seatsData.seat.filter(seat => seat.grade === '나')}
          />
        );
      case '다':
        return (
          <DaArea
            seatsData={seatsData.seat.filter(seat => seat.grade === '다')}
          />
        );
      default:
        return null;
    }
  };

  return (
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
