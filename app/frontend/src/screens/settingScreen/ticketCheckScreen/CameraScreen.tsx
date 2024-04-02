import {AppState, Dimensions, StyleSheet, Text, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {checkQRAPI} from '../../../api/ticket/ticket';
import { alertAndLog } from '../../../utils/common/alertAndLog';

export default function CameraScreen() {
  console.log(AppState.currentState)
  const checkQR = async event => {
    const QrUrl = await event.data;
    const start = await QrUrl.indexOf('/ticket');
    const url = await QrUrl.substring(start);
    try {
      const res = await checkQRAPI({url: url});
    } catch (error) {
      console.log(error);
      alertAndLog('', error)
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={checkQR}
        topContent={<Text>1</Text>}
        reactivateTimeout={3000}
        reactivate={true}
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        cameraContainerStyle={{
          width: '100%',
          height: '65%',
          backgroundColor: '#3E3E3E',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        cameraStyle={{
          width: Dimensions.get('screen').width * 0.7,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
