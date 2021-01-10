/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
// eslint-disable-next-line import/extensions
import App from './src/App';
import './src/i18n';

AppRegistry.registerComponent(appName, () => App);
