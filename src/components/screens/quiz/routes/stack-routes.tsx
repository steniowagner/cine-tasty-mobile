import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DEFAULT_HEADER_OPTIONS} from '@routes/constants';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';

import SetupQuestions from '../components/setup-questions/SetupQuestions';
import Questions from '../components/questions/Questions';
import Results from '../components/results/Results';
import Quiz from '../components/Quiz';

const Stack = createStackNavigator();

const QuizStack = () => {
  const translations = useTranslations();
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
          headerTitle: translations.translate(Translations.Tags.TABS_QUIZ),
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
