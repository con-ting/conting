/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './globals.js';
import 'react-native-get-random-values';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
AppRegistry.registerComponent(appName, () => App);
