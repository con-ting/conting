import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import {Shadow} from 'react-native-shadow-2';
import TicketInfoCard from './TicketInfoCard';
import {F_SIZE_TEXT} from '../../config/Font';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import CreateQR from '../ticketEntry/CreateQR';
import {biometricsAuth} from '../../utils/biometric/Biometrics';

type TicketCardProps = {
  onPress?: () => void;
  colors: Array<string>;
};

export default function TicketQrCard(props: TicketCardProps) {
  const [isPass, setIspass] = useState(false);
  const handlePass = async () => {
    const key = await biometricsAuth();
    if (key.result === true) {
      console.log('QR 생성');
      setIspass(!isPass);
    }
  };
  return (
    <LinearGradient
      style={{
        borderRadius: 20,
      }}
      colors={props.colors}>
      <View style={styles.container}>
        {isPass ? (
          <View style={styles.QrCard}>
            <Text style={F_SIZE_TEXT}>캡쳐 방지 기능이 활성화 상태입니다</Text>
            <View
              style={{
                marginVertical: 20,
              }}>
              <QRCode
                size={widthPercent(150)}
                color="black"
                backgroundColor="white"
                value="https://www.naver.com"
              />
            </View>
            <Text style={F_SIZE_TEXT}>QR코드 유효시간 15초</Text>
          </View>
        ) : (
          <CreateQR onPress={handlePass} />
        )}
        <TicketInfoCard />
      </View>
    </LinearGradient>
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
    justifyContent: 'space-between',
  },
  QrCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
