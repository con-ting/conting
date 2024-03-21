/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {SafeAreaView, StyleSheet, Text} from 'react-native';
// import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import React from 'react';
import AppContainer from './src/navigation/BottomTabNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[{backgroundColor: 'transparent', flex: 1}]}>
      {/* <BottomTabNavigator></BottomTabNavigator> */}
      <AppContainer />
    </SafeAreaView>
  );
}

export default App;
