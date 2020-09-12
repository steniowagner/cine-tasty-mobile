import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';
import { getDefaultHeaderOptions } from 'routes/constants';

import SetupQuestions from '../components/setup-questions/SetupQuestions';
import Questions from '../components/questions/Questions';
import Results from '../components/results/Results';
import LOCAL_ROUTES from './route-names';
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
        name={LOCAL_ROUTES.QUIZ.id}
        component={Quiz}
      />
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:tabs:quiz'),
        }}
        name={LOCAL_ROUTES.SETUP_QUESTIONS.id}
        component={SetupQuestions}
      />
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitleAlign: 'center',
        }}
        name={LOCAL_ROUTES.QUESTIONS.id}
        component={Questions}
      />

      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitleAlign: 'center',
          headerLeft: () => null,
        }}
        name={LOCAL_ROUTES.RESULTS.id}
        component={Results}
      />
    </Stack.Navigator>
  );
};

const Wrapper = () => (
  <RouteSuspenseWrapper>
    <QuizStack />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.QUIZ.id;

export default Wrapper;
