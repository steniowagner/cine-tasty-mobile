import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { getDefaultHeaderOptions } from 'routes/constants';

import ImagesQuality from '../components/images-quality/ImagesQuality';
import OpenSource from '../components/open-source/OpenSource';
import ThemeSettings from '../components/theme/ThemeSettings';
import Language from '../components/languages/Languages';
import Settings from '../components/Settings';
import About from '../components/about/About';
import LOCAL_ROUTES from './route-names';

const SettingsStack = (StackNavigator: ReturnType<typeof createStackNavigator>) => {
  const { t } = useTranslation();

  return (
    <>
      <StackNavigator.Screen
        name={LOCAL_ROUTES.SETTINGS.id}
        component={Settings}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:language:headerTitle'),
        })}
      />
      <StackNavigator.Screen
        name={LOCAL_ROUTES.LANGUAGE.id}
        component={Language}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:language:headerTitle'),
        })}
      />
      <StackNavigator.Screen
        name={LOCAL_ROUTES.OPEN_SOURCE.id}
        component={OpenSource}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:openSource:headerTitle'),
        })}
      />
      <StackNavigator.Screen
        name={LOCAL_ROUTES.ABOUT.id}
        component={About}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:about:headerTitle'),
        })}
      />
      <StackNavigator.Screen
        name={LOCAL_ROUTES.IMAGES_QUALITY.id}
        component={ImagesQuality}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:imagesQuality:headerTitle'),
        })}
      />
      <StackNavigator.Screen
        name={LOCAL_ROUTES.THEME.id}
        component={ThemeSettings}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:theme:headerTitle'),
        })}
      />
    </>
  );
};

export default SettingsStack;
