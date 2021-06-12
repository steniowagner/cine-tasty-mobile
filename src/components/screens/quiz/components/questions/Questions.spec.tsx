import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { RouteProp } from '@react-navigation/native';
import { IMocks } from 'graphql-tools';

import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import { ThemeContextProvider } from '@providers';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { QuizStackParams } from '../../routes/route-params-types';
import Questions from './Questions';

const quiz = [
  {
    __typename: 'Question',
    category: 'Entertainment: Television',
    correctAnswer: 'D',
    options: ['A', 'B', 'C', 'D'],
    question: 'Question 01',
    type: 'multiple',
  },
  {
    __typename: 'Question',
    category: 'Entertainment: Film',
    correctAnswer: 'True',
    options: ['False'],
    question: 'Question 02',
    type: 'boolean',
  },
];

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, Routes.Quiz.QUESTIONS>;

const routeParams: QuestionsScreenRouteProp = {
  name: Routes.Quiz.QUESTIONS,
  key: '',
  params: {
    numberOfQuestions: quiz.length,
    difficulty: SchemaTypes.QuestionDifficulty.MIXED,
    category: SchemaTypes.QuestionCategory.MIXED,
    type: SchemaTypes.QuestionType.MIXED,
  },
};

type RenderQuestionsProps = {
  route?: QuestionsScreenRouteProp;
  navigate?: typeof jest.fn;
  mockResolvers?: IMocks;
};

const renderQuestions = ({
  route = routeParams,
  mockResolvers,
  navigate,
}: RenderQuestionsProps) => {
  const QuestionsComponent = ({ navigation }) => (
    <ThemeContextProvider>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Questions navigation={{ ...navigation, navigate }} route={route} />
      </AutoMockProvider>
    </ThemeContextProvider>
  );

  return <MockedNavigation component={QuestionsComponent} />;
};

const checkHasCorrespondingOptions = (
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

describe('Testing <Questions />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('it should render the loading-state when the screen mounts', () => {
    const { getByTestId } = render(renderQuestions({}));

    expect(getByTestId('loading-content-indicator')).not.toBe(null);
  });

  it('it should show the "restart-quiz-header-button" when the question showed is other than the first', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => quiz,
      }),
    };

    const { getByTestId, getAllByTestId } = render(renderQuestions({ mockResolvers }));

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('multi-choice-answer')[0]);

    fireEvent.press(getAllByTestId('next-button')[0]);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('retart-quiz-button')).not.toBeNull();
  });

  it('it should not show the "restart-quiz-header-button" when the first-question is visible', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => quiz,
      }),
    };

    const { queryByTestId } = render(renderQuestions({ mockResolvers }));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('retart-quiz-button')).toBeNull();
  });

  it('it should render all items correctly', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => quiz,
      }),
    };

    const { getByTestId, getAllByTestId } = render(renderQuestions({ mockResolvers }));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('questions-list')).not.toBeNull();

    expect(getAllByTestId('boolean-question').length).toBe(1);

    expect(getAllByTestId('multi-choice-options').length).toBe(1);

    // first-question

    expect(getAllByTestId('question-indicator-text')[0].children.join('')).toBe(
      `1/${quiz.length}`,
    );

    expect(getAllByTestId('question-text')[0].children[0]).toEqual(quiz[0].question);

    const firstOptions = getAllByTestId('card-wrapper')[0].children[1].props.answers;

    expect(checkHasCorrespondingOptions(quiz[0].options, firstOptions)).toEqual(true);

    expect(getAllByTestId('multi-choice-answer').length).toEqual(quiz[0].options.length);

    // second-question

    expect(getAllByTestId('question-indicator-text')[1].children.join('')).toEqual(
      `2/${quiz.length}`,
    );

    expect(getAllByTestId('question-text')[1].children[0]).toBe(quiz[1].question);
  });

  it('it should call navigate with the correct params when the user reach the list question', () => {
    const MULTI_CHOICE_OPTION_SELECTED = 0;

    const mockResolvers = {
      Query: () => ({
        quiz: () => quiz,
      }),
    };

    const navigate = jest.fn();

    const { getByTestId, getAllByTestId } = render(
      renderQuestions({ mockResolvers, navigate }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('multi-choice-answer')[MULTI_CHOICE_OPTION_SELECTED]);

    fireEvent.press(getAllByTestId('next-button')[0]);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('true-option-button'));

    fireEvent.press(getAllByTestId('next-button')[1]);

    expect(navigate).toBeCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(Routes.Quiz.RESULTS, {
      questions: quiz,
      answers: [quiz[0].options[MULTI_CHOICE_OPTION_SELECTED], 'true'],
    });
  });

  it('it should render the no-questions-found error when the array of quiz is empty', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => [],
      }),
    };

    const { getByTestId, getByText } = render(renderQuestions({ mockResolvers }));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('no-questions-error-wrapper')).not.toBe(null);

    expect(getByText(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.QUIZ_NO_QUESTIONS_ADVISE_TITLE)).not.toBeNull();
  });

  it('it should render the network-error when it receives a connection error', () => {
    const mockResolvers = {
      Query: () => ({
        quiz: () => new Error(),
      }),
    };

    const { getByTestId, getByText } = render(renderQuestions({ mockResolvers }));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('network-error-wrapper')).not.toBe(null);

    expect(getByText(TRANSLATIONS.ERRORS_NETWORK_ERROR_DESCRIPTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.ERRORS_NETWORK_ERROR_SUGGESTION)).not.toBeNull();

    expect(getByText(TRANSLATIONS.ERRORS_NETWORK_ERROR_TITLE)).not.toBeNull();
  });
});
