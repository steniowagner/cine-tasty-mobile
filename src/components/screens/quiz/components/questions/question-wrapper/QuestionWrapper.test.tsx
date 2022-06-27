import React from 'react';
import {View} from 'react-native';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import QuestionWrapper from './QuestionWrapper';

const defaultProps = {
  currentQuestionIndex: 1,
  numberOfQuestions: 2,
  question: 'ANY_QUESTION',
};

const renderQuestions = () => (
  <ThemeProvider theme={theme}>
    <QuestionWrapper
      currentQuestionIndex={defaultProps.currentQuestionIndex}
      numberOfQuestions={defaultProps.numberOfQuestions}
      question={defaultProps.question}>
      <View testID="children" />
    </QuestionWrapper>
  </ThemeProvider>
);

describe('<QuestionWrapper />', () => {
  const elements = {
    cardWrapper: (api: RenderAPI) => api.queryByTestId('card-wrapper'),
    questionIndicatorText: (api: RenderAPI) =>
      api.queryByTestId('question-indicator-text'),
    questionText: (api: RenderAPI) => api.queryByTestId('question-text'),
    children: (api: RenderAPI) => api.queryByTestId('question-text'),
  };

  afterEach(cleanup);

  it('should render correctly', () => {
    const component = render(renderQuestions());
    expect(
      elements.questionIndicatorText(component).props.children.join(''),
    ).toEqual(
      `${defaultProps.currentQuestionIndex}/${defaultProps.numberOfQuestions}`,
    );
    expect(elements.questionText(component).props.children).toEqual(
      defaultProps.question,
    );
    expect(elements.children).not.toBeNull();
  });
});
