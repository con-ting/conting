import {ImageBackground, StyleSheet, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import TicketInfoCard from '../card/TicketInfoCard';
import {ticketProps} from '../card/TicketEntryCard';

export default function TicketFront(props: ticketProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: props.poster,
        }}
        style={styles.image}
        imageStyle={{borderRadius: 20, resizeMode: 'stretch'}}>
        <TicketInfoCard {...props} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercent(250),
    height: heightPercent(500),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(130, 156, 199, 0.6)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
