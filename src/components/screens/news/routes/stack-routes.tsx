import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DEFAULT_HEADER_OPTIONS} from '@routes/constants';
import {Translations} from '@i18n/tags';
import {Routes} from '@routes/routes';
import {useTranslations} from '@hooks';

import {News} from '../components/News';

const Stack = createStackNavigator();

export const NewsStack = () => {
  const translations = useTranslations();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: translations.translate(Translations.Tags.TABS_NEWS),
          headerTitleAlign: 'center',
        }}
        name={Routes.News.NEWS}
        component={News}
      />
    </Stack.Navigator>
  );
};
