import {Dimensions, StyleSheet, Text, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={e => console.log('들어가슈', e)}
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
