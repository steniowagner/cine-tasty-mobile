import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DEFAULT_HEADER_OPTIONS } from '../../../../routes/constants';
import LOCAL_ROUTES from './route-names';
import Quiz from '../components/Quiz';

const Stack = createStackNavigator();

const NewsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        ...DEFAULT_HEADER_OPTIONS,
        headerTitle: LOCAL_ROUTES.QUIZ.title,
      }}
      name={LOCAL_ROUTES.QUIZ.id}
      component={Quiz}
    />
  </Stack.Navigator>
);

export const TabID = LOCAL_ROUTES.QUIZ.id;

export default NewsStack;
