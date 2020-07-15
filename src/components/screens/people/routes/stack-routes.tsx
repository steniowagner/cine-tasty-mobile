import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { getDefaultHeaderOptions } from 'routes/constants';

import People from '../components/People';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const PeopleStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:tabs:people'),
        }}
        initialParams={{
          headerTitle: t('translations:tabs:people'),
        }}
        name={LOCAL_ROUTES.PEOPLE.id}
        component={People}
      />
    </Stack.Navigator>
  );
};

export const TabID = LOCAL_ROUTES.PEOPLE.id;

export default PeopleStack;
