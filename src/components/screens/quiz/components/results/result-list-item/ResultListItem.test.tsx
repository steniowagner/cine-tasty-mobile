import React from 'react';
import {RenderAPI, cleanup, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {quizFixtures} from '@mocks/fixtures/quiz';
import {Translations} from '@i18n/tags';
import * as Types from '@local-types';

import {ResultListItem} from './ResultListItem';

const renderResultListItem = (result: Types.QuizResult) => (
  <ThemeProvider theme={theme}>
    <ResultListItem result={result} />
  </ThemeProvider>
);

describe('<ResultListItem />', () => {
  const elements = {
    correctAnswerIcon: (api: RenderAPI) =>
      api.queryByTestId('icon-checkbox-circle'),
    wrongAnswerIcon: (api: RenderAPI) => api.queryByTestId('icon-close-circle'),
    questionText: (api: RenderAPI) => api.queryByTestId('question-text'),
    correctAnswerText: (api: RenderAPI) =>
      api.queryByTestId('correct-answer-text'),
    userAnswerText: (api: RenderAPI) => api.queryByTestId('user-answer-text'),
  };

  afterEach(cleanup);

  it('should render correctly when the user got the answer right', () => {
    const result = quizFixtures().correctAnswerResult;
    const component = render(renderResultListItem(result));
    expect(elements.correctAnswerIcon(component)).not.toBeNull();
    expect(elements.wrongAnswerIcon(component)).toBeNull();
    expect(elements.questionText(component).children[0]).toEqual(
      result.question,
    );
    expect(elements.correctAnswerText(component).children[0]).toEqual(
      `${Translations.Tags.QUIZ_ANSWER}: ${result.userAnswer}`,
    );
    expect(elements.userAnswerText(component).children[0]).toEqual(
      `${Translations.Tags.QUIZ_YOUR_ANSWER}: ${result.userAnswer}`,
    );
  });

  it('should render correctly when the user got the wrong answer', () => {
    const result = quizFixtures().wrongAnswerResult;
    const component = render(renderResultListItem(result));
    expect(elements.correctAnswerIcon(component)).toBeNull();
    expect(elements.wrongAnswerIcon(component)).not.toBeNull();
    expect(elements.questionText(component).children[0]).toEqual(
      result.question,
    );
    expect(elements.correctAnswerText(component).children[0]).toEqual(
      `${Translations.Tags.QUIZ_ANSWER}: ${result.answer}`,
    );
    expect(elements.userAnswerText(component).children[0]).toEqual(
      `${Translations.Tags.QUIZ_YOUR_ANSWER}: ${result.userAnswer}`,
    );
  });
});
