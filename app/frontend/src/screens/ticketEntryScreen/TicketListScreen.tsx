import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TicketEntryCard from './../../components/card/TicketEntryCard';
import TicketQrCard from '../../components/card/TicketQrCard';
import {YellowButton} from '../../components/button/Button';
import {useNavigation} from '@react-navigation/native';
import {MAINBLACK} from '../../config/Color';

export default function TicketListScreen() {
  const navigation = useNavigation();
  const [isBack, setIsBack] = useState(false);
  const onPress = () => {
    setIsBack(!isBack);
  };

  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <View style={styles.ticketContainer}>
          {isBack ? (
            <TicketQrCard onPress={onPress} />
          ) : (
            <TicketEntryCard onPress={onPress} />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <YellowButton
            onPress={() => navigation.navigate('Refund')}
            btnText="구매 내역 보기"
            width={'60%'}
            textSize={16}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAINBLACK,
  },

  context: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,
  },
  ticketContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
});
