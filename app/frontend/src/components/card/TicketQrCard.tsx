import {Pressable, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {heightPercent, widthPercent} from '../../config/Dimensions';
import TicketInfoCard from './TicketInfoCard';
import {F_SIZE_TEXT} from '../../config/Font';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useState} from 'react';
import CreateQR from '../ticketEntry/CreateQR';
import {
  biometricsAuth,
  checkKey,
  createKey,
  deleteKey,
} from '../../utils/biometric/Biometrics';
import {healthCheckAPI, ticketQRAPI} from '../../api/ticket/ticket';
import {BASE_URL} from '../../config/AxiosConfig';
import {REDBASE} from '../../config/Color';
import {alertAndLog} from '../../utils/common/alertAndLog';
import {ticketProps} from './TicketEntryCard';
import {SharedValue} from 'react-native-reanimated';

type TicketCardProps = {
  colors: Array<string>;
  ticket: ticketProps;
  width: number;
  height: number;
};

export default function TicketQrCard(props: TicketCardProps) {
  const [isPass, setIspass] = useState(false);
  const [qrURL, setQrURL] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIspass(false);
    }
    let interval: any;
    if (isPass) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval); // 타이머 중지
      setTimeLeft(30); // 시간 초기화
    }

    return () => clearInterval(interval);
  }, [isPass, timeLeft]);

  // 입장권 터치시 지문 인식하는 과정
  const handlePass = async () => {
    // 키가 존재하는지 확인
    const keyExist = await checkKey();
    // 없다면 키 생성
    if (!keyExist) {
      alertAndLog('', '등록된 지문이 없습니다. 새로운 지문을 등록합니다.');
      await createKey();
    } else {
      // 지문 인식을 하는데 새로운 지문을 등록했을 경우 키 삭제 후 새로운 키 발급
      const {result, key, msg} = await biometricsAuth();
      console.log(key);
      if (key === null || key === undefined) {
        return;
      }
      if (msg === '지문 재등록 필요') {
        alertAndLog(
          '',
          '지문 정보가 변경되었습니다. 새로운 지문을 등록합니다.',
        );
        await deleteKey();
        await createKey();
        // 새로운 키 생성 후 함수 재실행
        handlePass();
      } else {
        // 정상적인 실행이 가능한 경우 qr코드를 보여줘야 함
        console.log('정상 실행');
        try {
          const res = await ticketQRAPI({
            ticket_id: props.ticket.id,
            finger_print: key,
          });
          setQrURL(`${BASE_URL}/ticket/${res.ticket_id}/qr/${res.uuid}`);
          setIspass(true);
          healthCheck(res.uuid);
        } catch (error) {
          alertAndLog('', error);
          console.log(error);
        }
      }
    }
  };

  // 네트워크가 끊길 경우 대비한 헬스 체크 함수
  const healthCheck = (uuid: string) => {
    const healthcheck = setInterval(async () => {
      try {
        const res = await healthCheckAPI({uuid: uuid});
      } catch (error) {
        switch (error) {
          case 'QR의 네트워크 차단이 감지되었습니다.':
            alertAndLog('', error);
            clearInterval(healthcheck);
            setIspass(false);
          case 'QR 코드가 만료되었습니다..':
            alertAndLog('', error);
            clearInterval(healthcheck);
            setIspass(false);
          default:
            console.log(error);
            clearInterval(healthcheck);
            setIspass(false);
        }
      }
    }, 2300);

    // 30초 후 자동으로 반복 종료
    setTimeout(() => {
      clearInterval(healthcheck);
      console.log('Health check stopped.');
    }, 30000);
  };

  return (
    <LinearGradient style={styles.container} colors={props.colors}>
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
                value={qrURL}
              />
            </View>
            <Text style={F_SIZE_TEXT}>
              QR코드 유효시간 <Text style={{color: REDBASE}}>{timeLeft}</Text>초
            </Text>
          </View>
        ) : (
          <CreateQR onPress={handlePass} />
        )}
        <TicketInfoCard {...props.ticket} />
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
