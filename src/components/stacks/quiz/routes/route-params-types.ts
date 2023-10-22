import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@navigation';

export type QuizStackParams = {
  [Routes.Quiz.QUIZ]: undefined;
  [Routes.Quiz.SETUP_QUESTIONS]: undefined;
};

/** Quiz-Screen-Props */
export type QuizScreenPropsNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.QUIZ
>;

export type QuizScreenPropsRouteProp = RouteProp<
  QuizStackParams,
  Routes.Quiz.QUIZ
>;

export type QuizScreenProps = StackScreenProps<
  QuizStackParams,
  Routes.Quiz.QUIZ
>;
