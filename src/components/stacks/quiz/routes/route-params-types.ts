import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import {
  QuizQuestionDifficulty,
  QuizQuestionCategory,
  QuizQuestionType,
} from '@schema-types';
import { Routes } from '@navigation';

export type QuizStackParams = {
  [Routes.Quiz.QUIZ]: undefined;
  [Routes.Quiz.SETUP_QUESTIONS]: undefined;
  [Routes.Quiz.QUESTIONS]: QuestionsProps;
};

type QuestionsProps = {
  difficulty: QuizQuestionDifficulty;
  category: QuizQuestionCategory;
  numberOfQuestions: number;
  type: QuizQuestionType;
};

/** Quiz-Props */
export type QuizPropsNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.QUIZ
>;
export type QuizPropsRouteProp = RouteProp<QuizStackParams, Routes.Quiz.QUIZ>;
export type QuizProps = StackScreenProps<QuizStackParams, Routes.Quiz.QUIZ>;

/** Setup-Questions-Props */
export type SetupQuestionsNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.SETUP_QUESTIONS
>;
export type SetupQuestionsRouteProp = RouteProp<
  QuizStackParams,
  Routes.Quiz.SETUP_QUESTIONS
>;
export type SetupQuestionsProps = StackScreenProps<
  QuizStackParams,
  Routes.Quiz.SETUP_QUESTIONS
>;
