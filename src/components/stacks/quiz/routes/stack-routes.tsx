import React, { useCallback } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import { HeaderTitle, defaultHeaderStyle, Routes } from '@navigation';
import { Translations } from '@/i18n/tags';
import { HeaderIconButton } from '@common-components';

import { SetupQuestions } from '../screens/setup-questions/SetupQuesionts';
import { QuizStackParams } from './route-params-types';
import { Quiz } from '../screens/quiz/Quiz';
import { Questions } from '../screens/questions/Questions';

const Stack = createStackNavigator<QuizStackParams>();

type HeaderLeftBackButtonProps = {
  navigation: StackNavigationProp<QuizStackParams>;
};

export const QuizStack = () => {
  const SetupQuestionsHeaderTitle = useCallback(
    () => <HeaderTitle translationTag={Translations.Quiz.QUIZ_SETUP} />,
    [],
  );

  const HeaderLeftBackButton = useCallback(
    (props: HeaderLeftBackButtonProps) => (
      <HeaderIconButton
        onPress={props.navigation.goBack}
        iconName="arrow-back"
        withMarginLeft
        color="text"
      />
    ),
    [],
  );

  return (
    <Stack.Navigator initialRouteName={Routes.Quiz.QUESTIONS}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Routes.Quiz.QUIZ}
        component={Quiz}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...defaultHeaderStyle,
          headerTitle: SetupQuestionsHeaderTitle,
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <HeaderLeftBackButton navigation={navigation} />,
        })}
        name={Routes.Quiz.SETUP_QUESTIONS}
        component={SetupQuestions}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          ...defaultHeaderStyle,
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <HeaderLeftBackButton navigation={navigation} />,
        })}
        name={Routes.Quiz.QUESTIONS}
        component={Questions}
      />
    </Stack.Navigator>
  );
};
