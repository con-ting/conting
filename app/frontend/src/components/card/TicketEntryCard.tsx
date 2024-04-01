import {
  StyleSheet,
} from 'react-native';
import {
  heightPercent,
  widthPercent,
} from '../../config/Dimensions';
import {useState} from 'react';
import TicketQrCard from './TicketQrCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TicketFront from '../ticketEntry/TicketFront';

type TicketEntryCardProps = {
  onPress?: () => void;
  colors : Array<string>
  poster: string;
  title?: string;
  ticketId?: number;
};

export default function TicketEntryCard(props: TicketEntryCardProps) {
  const [isBack, setIsBack] = useState(true);

  const backHandler = () => {
    console.log("앞뒤 전환")
    setIsBack(!isBack);
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={backHandler}>
      {isBack ? (
        <TicketFront poster={props.poster}/>
      ) : (
        <TicketQrCard colors={props.colors}/>
      )}
    </TouchableOpacity>
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
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});
