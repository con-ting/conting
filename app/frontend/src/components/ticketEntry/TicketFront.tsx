import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import TicketInfoCard from '../card/TicketInfoCard';
import FastImage from 'react-native-fast-image';
import {SharedValue} from 'react-native-reanimated';
import {ticketProps} from '../card/TicketEntryCard';

type frontProps = {
  ticket: ticketProps;
  rotate: SharedValue<number>;
  width: number;
  height: number;
};

export default function TicketFront(props: frontProps) {
  return (
    <Pressable
      style={{
        width: props.width,
        height: props.height,
      }}
      onPress={() => (props.rotate.value = props.rotate.value ? 0 : 1)}>
      <FastImage
        resizeMode={FastImage.resizeMode.stretch}
        source={{
          uri: props.ticket.poster,
        }}
        style={styles.image}>
        <TicketInfoCard {...props.ticket} />
      </FastImage>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
});
