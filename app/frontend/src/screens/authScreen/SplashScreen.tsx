import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {heightPercent} from '../../config/Dimensions.tsx';
import Logo from '../../assets/logo/logo.svg';
import * as Color from '../../config/Color';

type RootStackParamList = {
  OauthScreen: undefined;
  SplashScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
const SplashScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('OauthScreen');
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="bounceIn" duration={1500}>
        <Logo width={200} height={200} preserveAspectRatio="xMidYMid meet" />
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
