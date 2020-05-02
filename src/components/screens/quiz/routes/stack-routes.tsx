import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, withTheme } from 'styled-components';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';
import { getDefaultHeaderOptions } from 'routes/constants';

import SetupQuestions from '../components/setup-questions/SetupQuestions';
import Questions from '../components/questions/Questions';
import LOCAL_ROUTES from './route-names';
import Quiz from '../components/Quiz';

const Stack = createStackNavigator();

type Props = { theme: DefaultTheme };

const QuizStack = ({ theme }: Props) => {
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
        name={LOCAL_ROUTES.QUESTIONS.id}
        component={Questions}
      />
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(theme),
          headerTitle: t('translations:tabs:quiz'),
        }}
        name={LOCAL_ROUTES.SETUP_QUESTIONS.id}
        component={SetupQuestions}
      />
    </Stack.Navigator>
  );
};

const Wrapper = (props: any) => (
  <RouteSuspenseWrapper>
    <QuizStack
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </RouteSuspenseWrapper>
);

export const TabID = LOCAL_ROUTES.QUIZ.id;

export default withTheme(Wrapper);
