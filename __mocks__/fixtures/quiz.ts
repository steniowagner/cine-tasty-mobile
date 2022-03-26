import { GraphQLError } from 'graphql';

import {randomPositiveNumber, randomArrayElement} from '@mocks/utils';
import {GET_QUIZ_QUESTIONS} from '@graphql/queries';
import {shuffleDataset} from '@utils';
import * as SchemaTypes from '@schema-types';

export const mockQuiz = () => {
  const multiChoiceOptions = Array(4).fill('').map((_, index) => `OPTION_${index}`);
  const correctAnswerResult = {
    userAnswer: 'USER_ANSWER',
    answer: 'USER_ANSWER',
    question: 'QUESTION',
    isCorrect: true,
  };
  const wrongAnswerResult = {
    userAnswer: 'USER_ANSWER',
    answer: 'OTHER_ANSWER',
    question: 'QUESTION',
    isCorrect: false,
  };
  const defaultOptions = {
    difficulty: SchemaTypes.QuestionDifficulty.MIXED,
    category: SchemaTypes.QuestionCategory.MIXED,
    type:SchemaTypes. QuestionType.MIXED,
  };

  const booleanQuestions = (length: number) => Array(length).fill({}).map((_, index) => ({
    question: `${SchemaTypes.QuestionType.BOOLEAN}_QUESTION_${index}`,
    type: SchemaTypes.QuestionType.BOOLEAN.toLowerCase(),
    category: `Entertainment: BOOLEAN-CATEGORY-${index}`,
    __typename: 'Question',
    options: ['True', 'False'],
    correctAnswer: randomPositiveNumber(2) % 2 === 0 ? 'False' : 'True',
  })) as SchemaTypes.GetQuizQuestions_quiz[];

  const multiChoiceQuestions = (length: number) => Array(length).fill({}).map((_, index) => {
    const correctAnswer = randomArrayElement<string>(multiChoiceOptions);
    return {
      question: `${SchemaTypes.QuestionType.MULTIPLE}_QUESTION_${index}`,
      type: SchemaTypes.QuestionType.MULTIPLE.toLowerCase(),
      category: `Entertainment: MULTI-CATEGORY-${index}`,
      __typename: 'Question',
      options: multiChoiceOptions,
      correctAnswer,
    };
  })  as SchemaTypes.GetQuizQuestions_quiz[];

  const resolvers = (numberOfQuestions: number, quiz: SchemaTypes.GetQuizQuestions_quiz[] = []) => {
    const variables: SchemaTypes.GetQuizQuestionsVariables = {
      input: {
        numberOfQuestions,
        ...defaultOptions,
      },
    };
    const request = {
      request: {
        query: GET_QUIZ_QUESTIONS,
        variables,
      },
    };
    const result = {
      result: {
        data: {
          quiz,
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
      responseWithNetworkError,
      responseWithGraphQLError,
      request,
      result,
    };
  };

  const mixedQuestions = (numberOfQuestions: number) => {
    const multiChoiceQuestionsLength =
      numberOfQuestions % 2 === 0
        ? numberOfQuestions / 2
        : Math.floor(numberOfQuestions / 2);
    const booleaneQuestionsLength =
      numberOfQuestions % 2 === 0
        ? numberOfQuestions / 2
        : numberOfQuestions - Math.floor(numberOfQuestions / 2);
    const multipleChoiceQuestions = mockQuiz().multiChoiceQuestions(
      multiChoiceQuestionsLength,
    );
    const trueOrFlaseQuestions = mockQuiz().booleanQuestions(booleaneQuestionsLength);
    return shuffleDataset<SchemaTypes.GetQuizQuestions_quiz>([
      ...multipleChoiceQuestions,
      ...trueOrFlaseQuestions,
    ]);
  };

  return {
    multiChoiceQuestions,
    correctAnswerResult,
    multiChoiceOptions,
    wrongAnswerResult,
    booleanQuestions,
    defaultOptions,
    mixedQuestions,
    resolvers,
  };
};
