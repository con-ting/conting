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
  ticketId?: number;
};

export default function TicketEntryCard(props: TicketEntryCardProps) {
  return (
    <Shadow startColor="#829cc7" distance={1}>
      <View style={styles.container} onTouchEnd={props.onPress}>
        <ImageBackground
          source={{
            uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTEwMjFfMjYx%2FMDAxNTcxNjQzOTQxMzY4.YolACTYNYE8yCQUDEVF9tKd-B1OOI0NPcbNjhtfsLVMg.5VdwQO9LhJPrOx-53s8BfXAdLQBshTgizcNmgDMmcysg.JPEG%2F20191021_164330.jpg&type=sc960_832',
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
    width: widthPercent(200),
    height: heightPercent(400),
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
