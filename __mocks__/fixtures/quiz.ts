import { GraphQLError } from 'graphql';

import {randomPositiveNumber, randomArrayElement} from '@mocks/utils';
import {GET_QUIZ_QUESTIONS} from '@graphql/queries';
import {shuffleDataset} from '@utils';
import * as SchemaTypes from '@schema-types';

export const quizFixtures = () => {
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
    const multipleChoiceQuestions = multiChoiceQuestions(
      multiChoiceQuestionsLength,
    );
    const trueOrFlaseQuestions = booleanQuestions(booleaneQuestionsLength);
    return shuffleDataset<SchemaTypes.GetQuizQuestions_quiz>([
      ...multipleChoiceQuestions,
      ...trueOrFlaseQuestions,
    ]);
  };

  const getSuccessResolver = (numberOfQuestions: number, questions: SchemaTypes.GetQuizQuestions_quiz[]) => {
    const resolver = resolvers(numberOfQuestions, questions);
    return [{
      ...resolver.request,
      ...resolver.result,
    }];
  };

  const getNetworkErrorResolver = (numberOfQuestions: number, questions: SchemaTypes.GetQuizQuestions_quiz[]) => {
    const resolver = resolvers(numberOfQuestions, questions);
    return [{
      ...resolver.request,
      ...resolver.responseWithNetworkError,
    }];
  };

  const getGraphQLErrorResolver = (numberOfQuestions: number, questions: SchemaTypes.GetQuizQuestions_quiz[]) => {
    const resolver = resolvers(numberOfQuestions, questions);
    return [{
      ...resolver.request,
      ...resolver.responseWithGraphQLError,
    }];
  };

  const makeBooleanAnswer = () => randomPositiveNumber(3) % 2 === 0 ? 'true' : 'false';

  const makeMultiChoiceAnswer = (options: string[]) => {
    const indexAnswer = randomPositiveNumber(options.length - 1, 0);
    return options[indexAnswer];
  };

  const makeQuestionsAnswers = (questions: SchemaTypes.GetQuizQuestions_quiz[]) => questions.map((question, index) => {
    const isBooleanQuestion =
      questions[index].type === SchemaTypes.QuestionType.BOOLEAN.toLowerCase();
      return isBooleanQuestion ? makeBooleanAnswer() : makeMultiChoiceAnswer(questions[index].options);
  });

  return {
    makeQuestionsAnswers,
    getNetworkErrorResolver,
    multiChoiceQuestions,
    correctAnswerResult,
    multiChoiceOptions,
    getGraphQLErrorResolver,
    wrongAnswerResult,
    booleanQuestions,
    defaultOptions,
    mixedQuestions,
    getSuccessResolver,
    resolvers,
  };
};
