import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';
import {
  cleanup, fireEvent, render, act,
} from 'react-native-testing-library';

import { QuestionDifficulty, QuestionCategory, QuestionType } from 'types/schema';
import CONSTANTS from 'utils/constants';
import { dark } from 'styles/themes';

import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import { navigation } from '../../../../../../__mocks__/ReactNavigation';
import { QuizStackParams } from '../../routes/route-params-types';
import LOCAL_ROUTES from '../../routes/route-names';
import Questions from './Questions';

const quiz = [
  {
    __typename: 'Question',
    category: 'Entertainment: Television',
    correctAnswer: 'D',
    difficulty: 'difficulty',
    options: ['A', 'B', 'C', 'D'],
    question: 'Question 01',
    type: 'multiple',
  },
  {
    __typename: 'Question',
    category: 'Entertainment: Film',
    correctAnswer: 'True',
    difficulty: 'difficulty',
    options: ['False'],
    question: 'Question 02',
    type: 'boolean',
  },
];

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'QUESTIONS'>;

const route: QuestionsScreenRouteProp = {
  name: 'QUESTIONS',
  key: '',
  params: {
    numberOfQuestions: quiz.length,
    difficulty: QuestionDifficulty.MIXED,
    category: QuestionCategory.MIXED,
    type: QuestionType.MIXED,
  },
};

const renderQuestions = (
  mockedNavigation = navigation,
  mockedRoute = route,
  mockResolvers?: IMocks,
) => (
  <ThemeProvider
    theme={dark}
  >
    <AutoMockProvider
      mockResolvers={mockResolvers}
    >
      <Questions
        navigation={mockedNavigation}
        route={mockedRoute}
      />
    </AutoMockProvider>
  </ThemeProvider>
);

const checkHasCorrespondingAnswers = (
  expectedAnswers: string[],
  receivedAnswers: string[],
): boolean => {
  if (expectedAnswers.length !== receivedAnswers.length) {
    return false;
  }

  const hasCorrespondingAnswers = true;

  for (let i = 0; i < expectedAnswers.length; i += 1) {
    if (expectedAnswers[i] !== receivedAnswers[i]) {
      return false;
    }
  }

  return hasCorrespondingAnswers;
};

jest.useFakeTimers();

describe('Testing <Questions />', () => {
  afterEach(cleanup);

  it('it should render the items correctly', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => quiz,
      }),
    };

    const { getByTestId, getAllByTestId } = render(
      renderQuestions(undefined, undefined, mockResolvers),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('questions-list')).not.toBeNull();

    expect(getAllByTestId('question-indicator-text')[0].children.join('')).toBe(
      `1/${quiz.length}`,
    );

    expect(getAllByTestId('question-text')[0].children[0]).toBe(quiz[0].question);

    const firstCardAnswers = getAllByTestId('card-wrapper')[0].children[1].props.answers;

    expect(checkHasCorrespondingAnswers(quiz[0].options, firstCardAnswers)).toBe(true);

    expect(getAllByTestId('multi-choice-answer').length).toBe(quiz[0].options.length);

    expect(getAllByTestId('question-indicator-text')[1].children.join('')).toBe(
      `2/${quiz.length}`,
    );

    expect(getAllByTestId('question-text')[1].children[0]).toBe(quiz[1].question);

    expect(getAllByTestId('boolean-question').length).toBe(1);
  });

  it('it should call navigate with the correct params', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => quiz,
      }),
    };

    const navigate = jest.fn();

    const mockNavigation = {
      ...navigation,
      navigate,
    };

    const { getByTestId, getAllByTestId } = render(
      renderQuestions(mockNavigation, undefined, mockResolvers),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('multi-choice-answer')[0]);

    fireEvent.press(getAllByTestId('next-button')[0]);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('true-option-button'));

    fireEvent.press(getAllByTestId('next-button')[1]);

    expect(navigate).toBeCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(LOCAL_ROUTES.RESULTS.id, {
      questions: quiz,
      answers: [quiz[0].options[0], 'true'],
    });
  });

  it('it should render the loading state while querying', () => {
    const { getByTestId } = render(renderQuestions());

    expect(getByTestId('loading-content-indicator')).not.toBe(null);
  });

  it('it should render the no-questions error when the array of quiz is empty', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => [],
      }),
    };

    const { getByTestId } = render(renderQuestions(undefined, undefined, mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('no-questions-error-wrapper')).not.toBe(null);
  });

  it('it should render the network-error when it receives a connection error', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => new Error(CONSTANTS.ERROR_MESSAGES.NETWORK_FAILED_CONNECTION),
      }),
    };

    const { getByTestId } = render(renderQuestions(undefined, undefined, mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('network-error-wrapper')).not.toBe(null);
  });
});
