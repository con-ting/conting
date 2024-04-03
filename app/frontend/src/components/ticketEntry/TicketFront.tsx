import {ImageBackground, StyleSheet, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import TicketInfoCard from '../card/TicketInfoCard';
import {ticketProps} from '../card/TicketEntryCard';
import FastImage from 'react-native-fast-image';

export default function TicketFront(props: ticketProps) {
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: props.poster,
        }}
        style={styles.image}>
        <TicketInfoCard {...props} />
      </FastImage>
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
    resizeMode: 'stretch',
    borderRadius: 20,
  },
});
