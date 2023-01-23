import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DEFAULT_HEADER_OPTIONS} from '@routes/constants';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';

import {OptionsSelectedProvider} from '../components/setup-questions/provider/OptionsSelectedProvider';
import {SetupQuestions} from '../components/setup-questions/SetupQuestions';
import Questions from '../components/questions/Questions';
import Results from '../components/results/Results';
import {Quiz} from '../components/Quiz';
import {SetupQuestionsStackProps} from './route-params-types';

const Stack = createStackNavigator();

const SetupQuestionsWrapper = (props: SetupQuestionsStackProps) => (
  <OptionsSelectedProvider>
    <SetupQuestions {...props} />
  </OptionsSelectedProvider>
);

export const QuizStack = () => {
  const translations = useTranslations();

  return (
    <Stack.Navigator initialRouteName={Routes.Quiz.SETUP_QUESTIONS}>
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
        component={SetupQuestionsWrapper}
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
