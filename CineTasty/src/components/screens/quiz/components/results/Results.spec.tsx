import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { cleanup, render, act } from '@testing-library/react-native';

import theme from 'styles/theme';

import { correctAnswerConfig, incorrectAnswerConfig } from './ResultListItem';
import { navigation } from '../../../../../../__mocks__/ReactNavigation';
import { QuizStackParams } from '../../routes/route-params-types';
import Results from './Results';

type QuestionsScreenRouteProp = RouteProp<QuizStackParams, 'RESULTS'>;

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

const route: QuestionsScreenRouteProp = {
  name: 'RESULTS',
  key: '',
  params: {
    questions: quiz,
    answers: ['A', 'true'],
  },
};

const renderResults = (mockedNavigation = navigation, mockedRoute = route) => (
  <ThemeProvider theme={theme}>
    <Results navigation={mockedNavigation} route={mockedRoute} />
  </ThemeProvider>
);

jest.useFakeTimers();

describe('Testing <Results />', () => {
  afterEach(cleanup);

  it('it should render the results correctly', () => {
    const { getAllByTestId } = render(renderResults());

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.color).toEqual(incorrectAnswerConfig.color);
    expect(getAllByTestId('icon')[0].props.name).toEqual(incorrectAnswerConfig.icon);

    expect(getAllByTestId('icon')[1].props.color).toEqual(correctAnswerConfig.color);
    expect(getAllByTestId('icon')[1].props.name).toEqual(correctAnswerConfig.icon);
  });
});
