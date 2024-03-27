import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RootApp} from './src/RootApp';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {clusterApiUrl} from '@solana/web3.js';
import {
  ConnectionProvider,
  RPC_ENDPOINT,
} from './src/components/mobileWalletAdapter/providers/ConnectionProvider.tsx';
import {AuthorizationProvider} from './src/components/mobileWalletAdapter/providers/AuthorizationProvider';

const App = () => {
  return (
    <RecoilRoot>
      <ConnectionProvider
        config={{commitment: 'processed'}}
        endpoint={clusterApiUrl(RPC_ENDPOINT)}>
        <AuthorizationProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <NavigationContainer>
                <RootApp />
              </NavigationContainer>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AuthorizationProvider>
      </ConnectionProvider>
    </RecoilRoot>
  );
};

export default App;
