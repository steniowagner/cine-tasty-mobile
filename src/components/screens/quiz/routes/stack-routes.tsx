import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import RouteSuspenseWrapper from 'components/common/RouteSuspenseWrapper';
import { DEFAULT_HEADER_OPTIONS } from 'routes/constants';

import SetupQuestions from '../components/setup-questions/SetupQuestions';
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
          ...DEFAULT_HEADER_OPTIONS,
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

export default Wrapper;
