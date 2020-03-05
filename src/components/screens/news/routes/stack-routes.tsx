import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DEFAULT_HEADER_OPTIONS } from '../../../../routes/constants';
import LOCAL_ROUTES from './route-names';
import News from '../components/News';

const Stack = createStackNavigator();

const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...DEFAULT_HEADER_OPTIONS,
        headerTitle: LOCAL_ROUTES.NEWS.title,
      }}
      name={LOCAL_ROUTES.NEWS.id}
      component={News}
    />
  </Stack.Navigator>
);

export const TabID = LOCAL_ROUTES.NEWS.id;

export default NewsStack;
