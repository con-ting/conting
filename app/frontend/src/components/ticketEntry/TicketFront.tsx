import {ImageBackground, StyleSheet, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import TicketInfoCard from '../card/TicketInfoCard';
import {ticketProps} from '../card/TicketEntryCard';
import FastImage from 'react-native-fast-image';

export default function TicketFront(props: ticketProps) {
  return (
    <FastImage
      resizeMode={FastImage.resizeMode.stretch}
      source={{
        uri: props.poster,
      }}
      style={styles.image}>
      <TicketInfoCard {...props} />
    </FastImage>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
});
