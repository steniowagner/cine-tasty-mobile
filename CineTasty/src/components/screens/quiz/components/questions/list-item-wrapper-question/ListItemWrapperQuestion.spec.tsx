import React from 'react';
import { View } from 'react-native';
import { cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import ListItemWrapperQuestion from './ListItemWrapperQuestion';

const defaultProps = {
  currentQuestionIndex: 1,
  numberOfQuestions: 1,
  question: 'question',
};

const renderQuestions = () => (
  <ThemeProvider theme={theme}>
    <ListItemWrapperQuestion
      currentQuestionIndex={defaultProps.currentQuestionIndex}
      numberOfQuestions={defaultProps.numberOfQuestions}
      question={defaultProps.question}>
      <View />
    </ListItemWrapperQuestion>
  </ThemeProvider>
);

describe('Testing <ListItemWrapperQuestion />', () => {
  afterEach(cleanup);

  it('it should render correctly', () => {
    const { getByTestId } = render(renderQuestions());

    expect(getByTestId('question-indicator-text').props.children.join('')).toEqual(
      `${defaultProps.currentQuestionIndex}/${defaultProps.numberOfQuestions}`,
    );

    expect(getByTestId('question-text').props.children).toEqual(defaultProps.question);
  });
});
