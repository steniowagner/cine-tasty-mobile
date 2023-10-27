import React from 'react';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';
import { Translations } from '@/i18n/tags';

import { randomPositiveNumber } from '../../../../../../../../__mocks__/utils';
import MultiChoiceQuestion from './MultiChoiceQuestion';

const OPTIONS = Array(randomPositiveNumber(10, 1))
  .fill('')
  .map((_, index) => `Option_${index + 1}`);

const renderMultiChoiceQuestion = (onPressNext = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <MultiChoiceQuestion
      onPressNext={onPressNext}
      options={OPTIONS}
      isFocused
    />
  </ThemeProvider>
);

describe('Quiz/Questions/MultiChoiceQuestion', () => {
  const elements = {
    options: (api: RenderAPI) =>
      api.getAllByTestId('multi-choice-option-button'),
    nextButton: (api: RenderAPI) => api.getByTestId('select-button'),
    nextButtonText: (api: RenderAPI) => api.getByTestId('select-button-text'),
  };

  describe('Rendering', () => {
    it('should render the "Next-button" with the correct text', () => {
      const component = render(renderMultiChoiceQuestion());
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Quiz.QUIZ_NEXT,
      );
    });
  });

  describe('Pressing', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should call "onPressNext" correctly when "select some option" and press "NEXT"', () => {
      const onPressNext = jest.fn();
      const component = render(renderMultiChoiceQuestion(onPressNext));
      const indexOptionSelected = randomPositiveNumber(OPTIONS.length - 1);
      fireEvent.press(elements.options(component)[indexOptionSelected]);
      act(() => {
        jest.runAllTimers();
      });
      expect(onPressNext).toBeCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPressNext).toBeCalledTimes(1);
      expect(onPressNext).toBeCalledWith(OPTIONS[indexOptionSelected]);
    });
  });
});
