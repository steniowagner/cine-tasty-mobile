import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from '@/navigation/routes';

import { SetupQuestions } from '../screens/setup-questions/SetupQuesionts';
import { QuizStackParams } from './route-params-types';
import { Quiz } from '../screens/quiz/Quiz';
import { Translations } from '@/i18n/tags';
import { HeaderTitle, defaultHeaderStyle } from '@/navigation';

const Stack = createStackNavigator<QuizStackParams>();

export const QuizStack = () => {
  const SetupQuestionsHeaderTitle = useCallback(
    () => <HeaderTitle translationTag={Translations.Quiz.QUIZ_SETUP} />,
    [],
  );

  return (
    <Stack.Navigator initialRouteName={Routes.Quiz.QUIZ}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Routes.Quiz.QUIZ}
        component={Quiz}
      />
      <Stack.Screen
        options={{
          ...defaultHeaderStyle,
          headerTitle: SetupQuestionsHeaderTitle,
          headerTitleAlign: 'center',
        }}
        name={Routes.Quiz.SETUP_QUESTIONS}
        component={SetupQuestions}
      />
    </Stack.Navigator>
  );
};
