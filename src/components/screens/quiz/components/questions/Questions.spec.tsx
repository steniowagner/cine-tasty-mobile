import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { IMocks } from 'graphql-tools';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

import { QuestionDifficulty, QuestionCategory, QuestionType } from 'types/schema';
import CONSTANTS from 'utils/constants';
import theme from 'styles/theme';

import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../__mocks__/MockedNavigator';
import { QuizStackParams } from '../../routes/route-params-types';
import LOCAL_ROUTES from '../../routes/route-names';
import Questions, {
  NO_QUESTIONS_ERROR_DESCRIPTION_I18N_REF,
  NO_QUESTIONS_ERROR_SUGGESTION_I18N_REF,
  NO_QUESTIONS_ERROR_TITLE_I18N_REF,
  NO_CONNECTION_ERROR_DESCRIPTION_I18N_REF,
  NO_CONNECTION_ERROR_SUGGGESTION_I18N_REF,
  NO_CONNECTION_ERROR_TITLE_I18N_REF,
} from './Questions';

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

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'QUESTIONS'>;

const routeParams: QuestionsScreenRouteProp = {
  name: 'QUESTIONS',
  key: '',
  params: {
    numberOfQuestions: quiz.length,
    difficulty: QuestionDifficulty.MIXED,
    category: QuestionCategory.MIXED,
    type: QuestionType.MIXED,
  },
};

type Props = {
  route?: QuestionsScreenRouteProp;
  navigate?: typeof jest.fn;
  mockResolvers?: IMocks;
};

const renderQuestions = ({ route = routeParams, mockResolvers, navigate }: Props) => {
  const QuestionsComponent = ({ navigation }) => (
    <ThemeProvider theme={theme}>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <Questions navigation={{ ...navigation, navigate }} route={route} />
      </AutoMockProvider>
    </ThemeProvider>
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

    expect(navigate).toHaveBeenCalledWith(LOCAL_ROUTES.RESULTS.id, {
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

    expect(getByText(NO_QUESTIONS_ERROR_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(NO_QUESTIONS_ERROR_SUGGESTION_I18N_REF)).not.toBeNull();

    expect(getByText(NO_QUESTIONS_ERROR_TITLE_I18N_REF)).not.toBeNull();
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

    expect(getByText(NO_CONNECTION_ERROR_DESCRIPTION_I18N_REF)).not.toBeNull();

    expect(getByText(NO_CONNECTION_ERROR_SUGGGESTION_I18N_REF)).not.toBeNull();

    expect(getByText(NO_CONNECTION_ERROR_TITLE_I18N_REF)).not.toBeNull();
  });
});
