import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../components/Settings';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerTitle: LOCAL_ROUTES.SETTINGS.title,
      }}
      name={LOCAL_ROUTES.SETTINGS.id}
      component={Settings}
    />
  </Stack.Navigator>
);

export const TabID = LOCAL_ROUTES.SETTINGS.id;

export default NewsStack;
