import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { cleanup, render, act } from '@testing-library/react-native';

import { navigation } from '@mocks/navigationMock';
import { ThemeContextProvider } from '@providers';
import { Routes } from '@routes/routes';

import Results from './Results';

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

const route = {
  name: Routes.Quiz.RESULTS,
  key: '',
  params: {
    questions: quiz,
    answers: ['A', 'true'],
  },
};

const renderResults = (mockedNavigation = navigation, mockedRoute = route) => (
  <ThemeContextProvider>
    <Results navigation={mockedNavigation} route={mockedRoute} />
  </ThemeContextProvider>
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
