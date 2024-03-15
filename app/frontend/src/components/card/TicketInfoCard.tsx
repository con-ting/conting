import {StyleSheet, Text, View} from 'react-native';
import {heightPercent} from '../../config/Dimensions';
import {F_SIZE_SMALLTEXT, F_SIZE_TEXT, F_SIZE_Y_TEXT} from '../../config/Font';

export default function TicketInfoCard() {
  return (
    <>
      <View style={styles.infoCard}>
        <View
          style={{
            marginBottom: heightPercent(15),
          }}>
          <Text style={F_SIZE_Y_TEXT}>WORLD TOUR CONCERT</Text>
        </View>
        <View style={styles.textCard}>
          <Text style={F_SIZE_TEXT}>Date</Text>
          <Text style={F_SIZE_SMALLTEXT}> 2024.03.15</Text>
        </View>
        <View style={styles.textCard}>
          <Text style={F_SIZE_TEXT}>Location</Text>
          <Text style={F_SIZE_SMALLTEXT}> KSPO DOME</Text>
        </View>
        <View style={styles.textCard}>
          <Text style={F_SIZE_TEXT}>Row</Text>
          <Text style={F_SIZE_SMALLTEXT}>가</Text>
        </View>
        <View style={styles.textCard}>
          <Text style={F_SIZE_TEXT}>No</Text>
          <Text style={F_SIZE_SMALLTEXT}>15</Text>
        </View>
      </View>
    </>
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
