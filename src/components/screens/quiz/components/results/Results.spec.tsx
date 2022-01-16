import React from 'react';
import { cleanup, render, act } from '@testing-library/react-native';

import { navigation } from '@mocks/navigationMock';
import { ThemeContextProvider } from '@providers';
import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';

import Results from './Results';

const quiz: SchemaTypes.GetQuizQuestions_quiz[] = [
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

const renderResults = (mockedNavigation = navigation) => (
  <ThemeContextProvider>
    <Results
      navigation={mockedNavigation}
      route={{
        name: Routes.Quiz.RESULTS,
        key: `${Routes.Quiz.RESULTS}-key`,
        params: {
          questions: quiz,
          answers: ['A', 'true'],
        },
      }}
    />
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
