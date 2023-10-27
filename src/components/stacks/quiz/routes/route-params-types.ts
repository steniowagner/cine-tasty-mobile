import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import {
  QuizQuestionDifficulty,
  QuizQuestionCategory,
  QuizQuestionType,
  QueryQuestions_quiz,
} from '@schema-types';
import { Routes } from '@navigation';

export type QuizStackParams = {
  [Routes.Quiz.QUIZ]: undefined;
  [Routes.Quiz.SETUP_QUESTIONS]: undefined;
  [Routes.Quiz.QUESTIONS]: QuestionsNavigationProps;
  [Routes.Quiz.RESULTS]: ResultsNavigationProps;
};

type QuestionsNavigationProps = {
  difficulty: QuizQuestionDifficulty;
  category: QuizQuestionCategory;
  numberOfQuestions: number;
  type: QuizQuestionType;
};

type ResultsNavigationProps = {
  questions: QueryQuestions_quiz[];
  answers: string[];
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

/** Questions-Props */
export type QuestionsNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.QUESTIONS
>;
export type QuestionsRouteProp = RouteProp<
  QuizStackParams,
  Routes.Quiz.QUESTIONS
>;
export type QuestionsProps = StackScreenProps<
  QuizStackParams,
  Routes.Quiz.QUESTIONS
>;
