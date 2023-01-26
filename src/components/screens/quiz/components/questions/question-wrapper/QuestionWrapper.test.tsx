import React from 'react';
import {View} from 'react-native';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';

import {QuestionWrapper} from './QuestionWrapper';

const DEFAULT_QUESTION = 'ANY_QUESTION';

const renderQuestions = (
  currentQuestionIndex: number,
  numberOfQuestions: number,
) => (
  <ThemeProvider theme={theme}>
    <QuestionWrapper
      currentQuestionIndex={currentQuestionIndex}
      numberOfQuestions={numberOfQuestions}
      question={DEFAULT_QUESTION}>
      <View testID="children" />
    </QuestionWrapper>
  </ThemeProvider>
);

describe('<QuestionWrapper />', () => {
  const elements = {
    questionIndicatorText: (api: RenderAPI) =>
      api.queryByTestId('question-indicator-text'),
    questionText: (api: RenderAPI) => api.queryByTestId('question-text'),
    children: (api: RenderAPI) => api.queryByTestId('children'),
  };

  afterEach(cleanup);

  it('should render correctly', () => {
    const currentQuestionIndex = randomPositiveNumber(10);
    const numberOfQuestions = randomPositiveNumber(10);
    const component = render(
      renderQuestions(currentQuestionIndex, numberOfQuestions),
    );
    expect(
      elements.questionIndicatorText(component).props.children.join(''),
    ).toEqual(`${currentQuestionIndex}/${numberOfQuestions}`);
    expect(elements.questionText(component).props.children).toEqual(
      DEFAULT_QUESTION,
    );
    expect(elements.children).not.toBeNull();
  });
});
