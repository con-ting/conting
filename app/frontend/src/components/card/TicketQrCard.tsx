import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {Shadow} from 'react-native-shadow-2';
import TicketInfoCard from './TicketInfoCard';
import {F_SIZE_TEXT} from '../../config/Font';
import LinearGradient from 'react-native-linear-gradient';

type TicketCardProps = {
  onPress: () => void;
}

export default function TicketQrCard(props: TicketCardProps) {
  return (
    <Shadow startColor="#829cc7" distance={1}>
      <LinearGradient
        style={{
          borderRadius: 20,
        }}
        colors={['#829cc7', '#1d3053', '#e4cdd9']}>
        <View style={styles.container} onTouchEnd={props.onPress}>
          <View style={styles.QrCard}>
            <Text style={F_SIZE_TEXT}>캡쳐 방지 기능이 활성화 상태입니다</Text>
            <View
            style={{
              marginVertical: 20
            }}
            >
              <QRCode
                size={widthPercent(150)}
                color="black"
                backgroundColor="white"
                value="https://www.naver.com"
              />
            </View>
            <Text style={F_SIZE_TEXT}>QR코드 유효시간 15초</Text>
          </View>
          <TicketInfoCard />
        </View>
      </LinearGradient>
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
    justifyContent: 'space-between',
  },
  QrCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
