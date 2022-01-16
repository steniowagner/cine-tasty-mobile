import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { DEFAULT_HEADER_OPTIONS } from '@routes/constants';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import SetupQuestions from '../components/setup-questions/SetupQuestions';
import Questions from '../components/questions/Questions';
import Results from '../components/results/Results';
import Quiz from '../components/Quiz';

const Stack = createStackNavigator();

const QuizStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Routes.Quiz.QUIZ}
        component={Quiz}
      />
      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: t(TRANSLATIONS.TABS_QUIZ),
          headerTitleAlign: 'center',
        }}
        name={Routes.Quiz.SETUP_QUESTIONS}
        component={SetupQuestions}
      />
      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitleAlign: 'center',
        }}
        name={Routes.Quiz.QUESTIONS}
        component={Questions}
      />

      <Stack.Screen
        options={{
          ...DEFAULT_HEADER_OPTIONS,
          headerTitleAlign: 'center',
          headerLeft: () => null,
        }}
        name={Routes.Quiz.RESULTS}
        component={Results}
      />
    </Stack.Navigator>
  );
};

export default QuizStack;
