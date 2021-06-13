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

/** Quiz-Stack-Props */
export type QuizStackPropsNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.QUIZ
>;
export type QuizStackPropsRouteProp = RouteProp<QuizStackParams, Routes.Quiz.QUIZ>;

export type QuizStackProps = {
  navigation: QuizStackPropsNavigationProp;
  route: QuizStackPropsRouteProp;
};

/* SetupQuestions-Stack-Props */
export type SetupQuestionsStackNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.SETUP_QUESTIONS
>;
export type SetupQuestionsStackRouteProp = RouteProp<
  QuizStackParams,
  Routes.Quiz.SETUP_QUESTIONS
>;

export type SetupQuestionsStackProps = {
  navigation: StackNavigationProp<QuizStackParams, Routes.Quiz.SETUP_QUESTIONS>;
  route: SetupQuestionsStackRouteProp;
};

/* Questions-Stack-Props */
export type QuestionsStackNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.QUESTIONS
>;
export type QuestionsStackRouteProp = RouteProp<QuizStackParams, Routes.Quiz.QUESTIONS>;

export type QuestionsStackProps = {
  navigation: QuestionsStackNavigationProp;
  route: QuestionsStackRouteProp;
};

/* Results-Stack-Props */
export type ResultsStackNavigationProp = StackNavigationProp<
  QuizStackParams,
  Routes.Quiz.RESULTS
>;
export type ResultsStackRouteProp = RouteProp<QuizStackParams, Routes.Quiz.RESULTS>;

export type ResultsStackProps = {
  navigation: ResultsStackNavigationProp;
  route: ResultsStackRouteProp;
};
