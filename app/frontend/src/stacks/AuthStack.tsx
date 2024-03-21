import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/authScreen/SplashScreen';
import LoginScreen from '../screens/authScreen/LoginScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

export default AuthStack;
