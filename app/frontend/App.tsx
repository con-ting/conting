import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RootApp} from './src/RootApp';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <RootApp />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;
