import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {
  fontPercent,
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {Shadow} from 'react-native-shadow-2';
import TicketInfoCard from './TicketInfoCard';

type TicketEntryCardProps = {
  onPress?: () => void;
  poster : string
  title ?: string
  ticketId?: number;
};

export default function TicketEntryCard(props: TicketEntryCardProps) {
  return (
    <Shadow startColor="#829cc7" distance={1}>
      <View style={styles.container} onTouchEnd={props.onPress}>
        <ImageBackground
          source={{
            uri: props.poster,
          }}
          style={styles.image}
          imageStyle={{borderRadius: 20}}>
          <TicketInfoCard />
        </ImageBackground>
      </View>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercent(300),
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
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});
