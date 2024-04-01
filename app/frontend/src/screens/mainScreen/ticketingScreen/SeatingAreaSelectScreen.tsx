import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SeatAreaButtons from '../../../components/button/SeatAreaButtons';
import {useEffect} from 'react';

export default function SeatingAreaSelectScreen({route}) {
  const biometricKey = route.params.biometricKey;
  const scheduleID = route.params.scheduleID;
  const showID = route.params.showID;

  return (
    <ScrollView style={styles.container}>
      <SeatAreaButtons
        biometricKey={biometricKey}
        scheduleID={scheduleID}
        showID={showID}
      />
      {/* <Text style={F_SIZE_BIGTEXT}>구역 선택할 페이지입니다</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
