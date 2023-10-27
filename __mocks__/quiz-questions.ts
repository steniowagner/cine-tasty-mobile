import { GraphQLError } from 'graphql';

import { GET_QUESTIONS } from '../src/components/stacks/quiz/screens/questions/use-questions';
import {
  QuizQuestionCategory,
  QuizQuestionDifficulty,
  QuizQuestionType,
} from '../src/types/schema';
import { randomPositiveNumber } from './utils';

export const MULTI_CHOICE_QUESTION_CATEGORY = 'Multi-Choice-Question-Category';
export const MULTI_CHOICE_OPTIONS = [
  'Wrong-Answer-1',
  'Correct-Answer',
  'Wrong-Answer-2',
  'Wrong-Answer-3',
];
export const BOOLEAN_QUESTIONS_CATEGORY = 'Boolean-Question-Category';
export const BOOLEAN_OPTIONS = ['True', 'False'];
export const BASE_QUIZ_QUESTIONS_VARIABLES = {
  difficulty: QuizQuestionDifficulty.MIXED,
  category: QuizQuestionCategory.MIXED,
  type: QuizQuestionType.MIXED,
};

const makeMultipleChoiceQuestion = () => ({
  __typename: 'QuizQuestion',
  category: `:${MULTI_CHOICE_QUESTION_CATEGORY}`,
  correctAnswer: 'Correct-Answer',
  options: MULTI_CHOICE_OPTIONS,
  question: 'Multi-Choice-Question',
  type: 'multiple',
});

const makeBooleanQuestion = () => ({
  __typename: 'QuizQuestion',
  category: `:${BOOLEAN_QUESTIONS_CATEGORY}`,
  correctAnswer: 'True',
  options: BOOLEAN_OPTIONS,
  question: 'Boolean-Question',
  type: 'boolean',
});

export type SequenceOfQuestions = (
  | QuizQuestionType.MULTIPLE
  | QuizQuestionType.BOOLEAN
)[];

const baseMockQuizQuestionsQueryResponse = (
  sequenceOfQuestions: SequenceOfQuestions,
  withEmptyResponse = false,
) => {
  const quiz = sequenceOfQuestions.map(questionType =>
    questionType === QuizQuestionType.MULTIPLE
      ? makeMultipleChoiceQuestion()
      : makeBooleanQuestion(),
  );
  const request = {
    request: {
      query: GET_QUESTIONS,
      variables: {
        input: {
          ...BASE_QUIZ_QUESTIONS_VARIABLES,
          numberOfQuestions: sequenceOfQuestions.length,
        },
      },
    },
  };
  const result = {
    result: {
      data: {
        quiz: withEmptyResponse ? [] : quiz,
      },
    },
  };
  const responseWithNetworkError = {
    ...request,
    error: new Error('A Network error occurred'),
  };
  const responseWithGraphQLError = {
    ...request,
    errors: [new GraphQLError('A GraphQL error occurred')],
  };

  return {
    responseWithGraphQLError,
    responseWithNetworkError,
    request,
    result,
  };
};

export const mockQuizQuestionsQuerySuccessResponse = (
  sequenceOfQuestions: SequenceOfQuestions,
  withEmptyResponse = false,
) => {
  const result = baseMockQuizQuestionsQueryResponse(
    sequenceOfQuestions,
    withEmptyResponse,
  );
  return [
    {
      ...result.request,
      ...result.result,
    },
  ];
};

export const mockQuizQuestionQueryErrorResponse = () => {
  const result = baseMockQuizQuestionsQueryResponse([]);
  const error = randomPositiveNumber(1) % 2 === 0 ? 'network' : 'graphql';
  const errorResponse =
    error === 'network'
      ? result.responseWithNetworkError
      : result.responseWithGraphQLError;
  return [
    {
      ...result.request,
      ...errorResponse,
    },
  ];
};
