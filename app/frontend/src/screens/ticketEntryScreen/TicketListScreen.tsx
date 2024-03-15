import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TicketEntryCard from './../../components/card/TicketEntryCard';
import TicketQrCard from '../../components/card/TicketQrCard';

export default function TicketListScreen() {
  const [isBack, setIsBack] = useState(false);
  const onPress = () => {
    setIsBack(!isBack)
  }

  return (
    <View style={styles.container}>
      {isBack ? <TicketQrCard onPress={onPress} /> : <TicketEntryCard onPress={onPress}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // 배경색을 검은색으로 설정
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white', // 텍스트 색상을 하얀색으로 설정하여 가독성 확보
    fontSize: 20,
    fontFamily: 'Jalnan2TTF',
  },
});