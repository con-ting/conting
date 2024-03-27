import {StyleSheet, Text, View} from 'react-native';
import EventCard from '../../../../components/card/EventCard';

export default function CastEventScreen() {
  return (
    <View>
      <View style={styles.card}>
        <EventCard
          name="테스트"
          img_url="http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040001/24/02/0400012402_199945_01.116.gif"
          start_at="2024.04.03"
          end_at="2024.04.10"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop: 15,
  },
});