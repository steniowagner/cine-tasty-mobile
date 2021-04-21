import { StackNavigationProp } from '@react-navigation/stack';

import { Routes } from '@routes/routes';

type SettingsStackParams = {
  [Routes.Settings.SETTINGS]: undefined;
  [Routes.Settings.IMAGES_QUALITY]: undefined;
  [Routes.Settings.OPEN_SOURCE]: undefined;
  [Routes.Settings.LANGUAGE]: undefined;
  [Routes.Settings.THEME]: undefined;
  [Routes.Settings.ABOUT]: undefined;
};

export type SettingsNavigationProp = StackNavigationProp<
  SettingsStackParams,
  Routes.Settings.SETTINGS
>;

export type SettingsStackProps = {
  navigation: SettingsNavigationProp;
};
