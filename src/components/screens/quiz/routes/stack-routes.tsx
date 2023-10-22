import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from '@/navigation/routes';

import { QuizStackParams } from './route-params-types';
import { QuizScreen } from '../screens/quiz/QuizScreen';

const Stack = createStackNavigator<QuizStackParams>();

export const QuizStack = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Quiz.QUIZ}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Routes.Quiz.QUIZ}
        component={QuizScreen}
      />
    </Stack.Navigator>
  );
};
