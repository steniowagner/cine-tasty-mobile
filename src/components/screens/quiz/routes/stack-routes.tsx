import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DEFAULT_HEADER_OPTIONS} from '@routes/constants';
import {HeaderIconButton} from '@components';
import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';
import {Routes} from '@routes/routes';

import {SetupQuestions} from '../components/setup-questions/SetupQuestions';
import {Questions} from '../components/questions/Questions';
import {Results} from '../components/results/Results';
import {Quiz} from '../components/Quiz';

const Stack = createStackNavigator();

export const QuizStack = () => {
  const translations = useTranslations();

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
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: translations.translate(Translations.Tags.TABS_QUIZ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
        name={Routes.Quiz.SETUP_QUESTIONS}
        component={SetupQuestions}
      />
      <Stack.Screen
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
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
