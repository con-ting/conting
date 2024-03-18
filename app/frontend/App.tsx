/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import React from 'react';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[{backgroundColor: 'black', flex: 1}]}>
      <BottomTabNavigator></BottomTabNavigator>
    </SafeAreaView>
  );
}

export default App;
