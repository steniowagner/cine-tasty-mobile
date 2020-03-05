import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DEFAULT_HEADER_OPTIONS } from '../../../../routes/constants';
import Discover from '../components/Home';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...DEFAULT_HEADER_OPTIONS,
        headerTitle: LOCAL_ROUTES.HOME.title,
      }}
      name={LOCAL_ROUTES.HOME.id}
      component={Discover}
    />
  </Stack.Navigator>
);

export const TabID = LOCAL_ROUTES.HOME.id;

export default HomeStack;
