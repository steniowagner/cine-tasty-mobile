import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { getDefaultHeaderOptions } from 'routes/constants';

import LOCAL_ROUTES from './route-names';
import News from '../components/News';

const Stack = createStackNavigator();

const NewsStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:tabs:news'),
        }}
        name={LOCAL_ROUTES.NEWS.id}
        component={News}
      />
    </Stack.Navigator>
  );
};

export const TabID = LOCAL_ROUTES.NEWS.id;

export default NewsStack;
