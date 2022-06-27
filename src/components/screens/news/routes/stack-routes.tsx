import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import {DEFAULT_HEADER_OPTIONS} from '@routes/constants';
import * as TRANSLATIONS from '@i18n/tags';
import {Routes} from '@routes/routes';

import {News} from '../components/News';

const Stack = createStackNavigator();

export const NewsStack = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.TABS_NEWS),
          headerTitleAlign: 'center',
        }}
        name={Routes.News.NEWS}
        component={News}
      />
    </Stack.Navigator>
  );
};
