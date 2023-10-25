import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';

import { QuestionWrapper } from './QuestionWrapper';
import { View } from 'react-native';
import { RenderAPI, render } from '@testing-library/react-native';

const CURRENT_QUESTION_INDEX = 1;
const NUMBER_OF_QUESTION = 2;
const QUESTION = 'QUESTION';

const renderQuestionWrapper = () => (
  <ThemeProvider theme={theme}>
    <QuestionWrapper
      currentQuestionIndex={CURRENT_QUESTION_INDEX}
      numberOfQuestions={NUMBER_OF_QUESTION}
      question={QUESTION}>
      <View testID="children" />
    </QuestionWrapper>
  </ThemeProvider>
);

describe('Quiz/Questions/MultiChoiceQuestion', () => {
  const elements = {
    indicatorText: (api: RenderAPI) =>
      api.getByTestId('question-indicator-text'),
    questionText: (api: RenderAPI) => api.getByTestId('question-text'),
    children: (api: RenderAPI) => api.getByTestId('children'),
  };

  it('should render the "indicator-text" correctly', () => {
    const component = render(renderQuestionWrapper());
    expect(elements.children(component)).not.toBeNull();
    expect(elements.indicatorText(component).children[0]).toEqual(
      `${CURRENT_QUESTION_INDEX}/${NUMBER_OF_QUESTION}`,
    );
    expect(elements.questionText(component).children[0]).toEqual(QUESTION);
  });
});
