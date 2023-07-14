import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {Routes} from '@routes/routes';

export type SettingsStackParams = {
  [Routes.Settings.SETTINGS]: undefined;
  [Routes.Settings.IMAGES_QUALITY]: undefined;
  [Routes.Settings.OPEN_SOURCE]: undefined;
  [Routes.Settings.LANGUAGE]: undefined;
  [Routes.Settings.THEME]: undefined;
  [Routes.Settings.ABOUT]: undefined;
};

/** Settings-Stack-Props */
export type SettingsNavigationProp = StackNavigationProp<
  SettingsStackParams,
  Routes.Settings.SETTINGS
>;
export type SettingsRouteProp = RouteProp<
  SettingsStackParams,
  Routes.Settings.SETTINGS
>;

export type SettingsStackProps = {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
};
