import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { getDefaultHeaderOptions } from 'routes/constants';

import Famous from '../components/Famous';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const FamousStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:tabs:famous'),
        }}
        initialParams={{
          headerTitle: t('translations:tabs:famous'),
        }}
        name={LOCAL_ROUTES.FAMOUS.id}
        component={Famous}
      />
    </Stack.Navigator>
  );
};

export const TabID = LOCAL_ROUTES.FAMOUS.id;

export default FamousStack;
