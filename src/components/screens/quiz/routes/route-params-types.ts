/* eslint-disable camelcase */
import { CustomModalParams } from '@components/screens/shared/customized-modal/routes/route-params-types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';

type QuizStackParams = {
  [Routes.Quiz.QUIZ]: undefined;
  [Routes.CustomModal.CUSTOM_MODAL]: CustomModalParams;
  [Routes.Quiz.SETUP_QUESTIONS]: undefined;
  [Routes.Quiz.QUESTIONS]: QuestionsProps;
  [Routes.Quiz.RESULTS]: ResultsProps;
};

type QuestionsProps = {
  difficulty: SchemaTypes.QuestionDifficulty;
  category: SchemaTypes.QuestionCategory;
  numberOfQuestions: number;
  type: SchemaTypes.QuestionType;
};

type ResultsProps = {
  questions: SchemaTypes.GetQuizQuestions_quiz[];
  answers: string[];
};

export type QuizStackProps = {
  navigation: StackNavigationProp<QuizStackParams, Routes.Quiz.QUIZ>;
};

export type SetupQuestionsStackProps = {
  navigation: StackNavigationProp<QuizStackParams, Routes.Quiz.SETUP_QUESTIONS>;
};

export type QuestionsStackProps = {
  navigation: StackNavigationProp<QuizStackParams, Routes.Quiz.QUESTIONS>;
  route: RouteProp<QuizStackParams, Routes.Quiz.QUESTIONS>;
};

export type ResultsStackProps = {
  navigation: StackNavigationProp<QuizStackParams, Routes.Quiz.RESULTS>;
  route: RouteProp<QuizStackParams, Routes.Quiz.RESULTS>;
};
