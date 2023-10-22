import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@navigation';

export type QuizStackParams = {
  [Routes.Quiz.QUIZ]: undefined;
  [Routes.Quiz.SETUP_QUESTIONS]: undefined;
};

/** Quiz-Props */
export type QuizPropsNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.QUIZ
>;

export type QuizPropsRouteProp = RouteProp<QuizStackParams, Routes.Quiz.QUIZ>;

export type QuizProps = StackScreenProps<QuizStackParams, Routes.Quiz.QUIZ>;
