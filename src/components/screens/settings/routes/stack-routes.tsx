import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import {DEFAULT_HEADER_OPTIONS} from '@routes/constants';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';

import ImagesQuality from '../components/images-quality/ImagesQuality';
import OpenSource from '../components/open-source/OpenSource';
import ThemeSettings from '../components/theme/ThemeSettings';
import Language from '../components/languages/Languages';
import {Settings} from '../components/Settings';
import About from '../components/about/About';

export const SettingsStack = (
  StackNavigator: ReturnType<typeof createStackNavigator>,
) => {
  const {t} = useTranslation();

  return (
    <>
      <StackNavigator.Screen
        name={Routes.Settings.SETTINGS}
        component={Settings}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.HOME_SETTINGS),
          headerTitleAlign: 'center',
        })}
      />
      <StackNavigator.Screen
        name={Routes.Settings.LANGUAGE}
        component={Language}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.SETTINGS_LANGUAGE_HEADER_TITLE),
          headerTitleAlign: 'center',
        })}
      />
      <StackNavigator.Screen
        name={Routes.Settings.OPEN_SOURCE}
        component={OpenSource}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.SETTINGS_OPEN_SOURCE_HEADER_TITLE),
          headerTitleAlign: 'center',
        })}
      />
      <StackNavigator.Screen
        name={Routes.Settings.ABOUT}
        component={About}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.SETTINGS_ABOUT_HEADER_TITLE),
          headerTitleAlign: 'center',
        })}
      />
      <StackNavigator.Screen
        name={Routes.Settings.IMAGES_QUALITY}
        component={ImagesQuality}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.SETTINGS_IMAGES_QUALITY_HEADER_TITLE),
          headerTitleAlign: 'center',
        })}
      />
      <StackNavigator.Screen
        name={Routes.Settings.THEME}
        component={ThemeSettings}
        options={() => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.SETTINGS_THEME_HEADER_TITLE),
          headerTitleAlign: 'center',
        })}
      />
    </>
  );
};
