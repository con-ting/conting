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
import {RealmProvider} from './src/components/realm/RealmContext.ts';

const App = () => {
  return (
    <RealmProvider>
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
    </RealmProvider>
  );
};

export default App;
