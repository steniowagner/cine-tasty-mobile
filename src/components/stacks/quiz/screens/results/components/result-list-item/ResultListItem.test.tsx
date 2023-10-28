import React from 'react';
import { RenderAPI, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';
import { Translations } from '@i18n/tags';

import { ResultListItem } from './ResultListItem';
import { QuizResult } from '../../use-results';

const correctAnswer = {
  userAnswer: 'CORRECT_ANSWER',
  answer: 'CORRECT_ANSWER',
  question: 'QUESTION',
  isCorrect: true,
};

const wrongAnswer = {
  userAnswer: 'WRONG_ANSWER',
  answer: 'CORRECT_ANSWER',
  question: 'QUESTION',
  isCorrect: false,
};

const renderResultListItem = (result: QuizResult) => (
  <ThemeProvider theme={theme}>
    <ResultListItem result={result} />
  </ThemeProvider>
);

describe('Screens/Quiz/Results/ResultListItem', () => {
  const elements = {
    correctAnswerIcon: (api: RenderAPI) =>
      api.queryByTestId('icon-checkbox-circle'),
    wrongAnswerIcon: (api: RenderAPI) => api.queryByTestId('icon-close-circle'),
    questionText: (api: RenderAPI) => api.getByTestId('question-text'),
    correctAnswerText: (api: RenderAPI) =>
      api.getByTestId('correct-answer-text'),
    userAnswerText: (api: RenderAPI) => api.getByTestId('user-answer-text'),
  };

  it('should render correctly when the "answer is correct"', () => {
    const component = render(renderResultListItem(correctAnswer));
    expect(elements.correctAnswerIcon(component)).not.toBeNull();
    expect(elements.wrongAnswerIcon(component)).toBeNull();
    expect(elements.questionText(component).children[0]).toEqual(
      correctAnswer.question,
    );
    expect(elements.correctAnswerText(component).children[0]).toEqual(
      `${Translations.Quiz.QUIZ_ANSWER}: ${correctAnswer.userAnswer}`,
    );
    expect(elements.userAnswerText(component).children[0]).toEqual(
      `${Translations.Quiz.QUIZ_YOUR_ANSWER}: ${correctAnswer.userAnswer}`,
    );
  });

  it('should render correctly when the "answer is wrong"', () => {
    const component = render(renderResultListItem(wrongAnswer));
    expect(elements.correctAnswerIcon(component)).toBeNull();
    expect(elements.wrongAnswerIcon(component)).not.toBeNull();
    expect(elements.questionText(component).children[0]).toEqual(
      wrongAnswer.question,
    );
    expect(elements.correctAnswerText(component).children[0]).toEqual(
      `${Translations.Quiz.QUIZ_ANSWER}: ${wrongAnswer.answer}`,
    );
    expect(elements.userAnswerText(component).children[0]).toEqual(
      `${Translations.Quiz.QUIZ_YOUR_ANSWER}: ${wrongAnswer.userAnswer}`,
    );
  });
});
