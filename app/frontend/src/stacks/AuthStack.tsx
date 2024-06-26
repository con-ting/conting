import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/authScreen/SplashScreen';
import LoginScreen from '../screens/authScreen/LoginScreen';
import JoinScreen from '../screens/authScreen/JoinScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import PhoneAuthScreen from '../screens/authScreen/PhoneAuthScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JoinScreen"
        component={JoinScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhoneAuthScreen"
        component={PhoneAuthScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default gestureHandlerRootHOC(AuthStack);
