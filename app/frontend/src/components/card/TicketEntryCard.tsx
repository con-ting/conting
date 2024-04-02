import {StyleSheet} from 'react-native';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {useState} from 'react';
import TicketQrCard from './TicketQrCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TicketFront from '../ticketEntry/TicketFront';

export type ticketProps = {
  poster: string;
  title: string;
  date: string;
  location: string;
  row: string;
  col: string;
};

type TicketEntryCardProps = {
  onPress?: () => void;
  colors: Array<string>;
  ticket: ticketProps;
};

export default function TicketEntryCard(props: TicketEntryCardProps) {
  const [isBack, setIsBack] = useState(true);
  const {ticket} = props;
  const backHandler = () => {
    setIsBack(!isBack);
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={backHandler}>
      {isBack ? (
        <TicketFront {...ticket} />
      ) : (
        <TicketQrCard ticket={ticket} colors={props.colors} />
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
