import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { cleanup, render, act } from '@testing-library/react-native';

import theme from 'styles/theme';

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

describe('Testing <Results />', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('it should render the results correctly', () => {
    const { getAllByTestId } = render(renderResults());

    act(() => {
      jest.runAllTimers();
    });

    const icons = getAllByTestId(/icon/);

    expect(icons[0].props.testID).toEqual('icon-close-circle');

    expect(icons[1].props.testID).toEqual('icon-checkbox-circle');
  });
});
