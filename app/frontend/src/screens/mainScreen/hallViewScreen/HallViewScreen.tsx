import {Text, View} from 'react-native';
import WebView from 'react-native-webview';
import { F_SIZE_BIGTEXT } from '../../../config/Font';

export default function HallViewScreen({route}) {
  const hallView = route.params.hallView;
  const hallName = route.params.hallName;
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{width: '100%', height: '100%'}}
        source={{
          uri: 'https://sketchfab.com/models/513365709b764e448172f948148cc7e3/embed?autostart=1',
        }}></WebView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: 50,
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Text style={F_SIZE_BIGTEXT}>{hallName}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: 50,
          bottom: 0,
          backgroundColor: 'black',
        }}>
      </View>
    </View>
  );
}
