import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {heightPercent, widthPercent} from '../../config/Dimensions.tsx';

import * as Color from '../../config/Color';
import {LocalImageLoader} from '../../utils/common/ImageLoader.tsx';
import messaging from '@react-native-firebase/messaging';

type RootStackParamList = {
  LoginScreen: undefined;
  SplashScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
const SplashScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    const fetchFCMToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    fetchFCMToken();

    const timeoutId = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="bounceIn" duration={1500}>
        <LocalImageLoader source={require('../../assets/logo/logoPng.png')} />
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.CUTEYELLOW,
  },
  logoContainer: {alignItems: 'center', flexDirection: 'row', columnGap: 5},
  logoImage: {height: heightPercent(30), aspectRatio: 1.0},
});

export default SplashScreen;
