import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DEFAULT_HEADER_OPTIONS } from '../../../../routes/constants';
import LOCAL_ROUTES from './route-names';
import People from '../components/People';

const Stack = createStackNavigator();

const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...DEFAULT_HEADER_OPTIONS,
        headerTitle: LOCAL_ROUTES.PEOPLE.title,
      }}
      name={LOCAL_ROUTES.PEOPLE.id}
      component={People}
    />
  </Stack.Navigator>
);

export const TabID = LOCAL_ROUTES.PEOPLE.id;

export default NewsStack;
