import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { getDefaultHeaderOptions } from '@routes/constants';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import News from '../components/News';

const Stack = createStackNavigator();

const NewsStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t(TRANSLATIONS.TABS_NEWS),
        }}
        name={Routes.News.NEWS}
        component={News}
      />
    </Stack.Navigator>
  );
};

export default NewsStack;
