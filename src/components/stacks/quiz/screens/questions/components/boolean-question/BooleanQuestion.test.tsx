import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';
import { Translations } from '@/i18n/tags';

import BooleanQuestion from './BooleanQuestion';

const renderBooleanQuestion = (onPressNext = jest.fn(), isFocused = true) => (
  <ThemeProvider theme={theme}>
    <BooleanQuestion onPressNext={onPressNext} isFocused={isFocused} />
  </ThemeProvider>
);

describe('Screens/Quiz/Questions/BooleanQuestion', () => {
  const elements = {
    trueOptionButton: (component: RenderAPI) =>
      component.getByTestId('true-option-button'),
    trueOptionText: (component: RenderAPI) =>
      component.getByTestId('true-option-text'),
    falseOptionButton: (component: RenderAPI) =>
      component.getByTestId('false-option-button'),
    falseOptionText: (component: RenderAPI) =>
      component.getByTestId('false-option-text'),
    nextButton: (api: RenderAPI) => api.getByTestId('select-button'),
    nextButtonText: (api: RenderAPI) => api.getByTestId('select-button-text'),
  };

  describe('Rendering', () => {
    describe('Texts', () => {
      it('should render the "option-texts" correctly', () => {
        const component = render(renderBooleanQuestion());
        expect(elements.falseOptionText(component).children[0]).toEqual(
          Translations.Quiz.QUIZ_FALSE,
        );
        expect(elements.trueOptionText(component).children[0]).toEqual(
          Translations.Quiz.QUIZ_TRUE,
        );
      });

      it('should render the "next-cta-text" correctly', () => {
        const component = render(renderBooleanQuestion());
        expect(elements.nextButtonText(component).children[0]).toEqual(
          Translations.Quiz.QUIZ_NEXT,
        );
      });
    });

    describe('When no option is selected', () => {
      it('should render the options corretly', () => {
        const component = render(renderBooleanQuestion());
        expect(
          elements.trueOptionButton(component).props.style.backgroundColor,
        ).toEqual(theme.colors.fallbackImageBackground);
        expect(
          elements.falseOptionButton(component).props.style.backgroundColor,
        ).toEqual(theme.colors.fallbackImageBackground);
      });
    });

    describe('When some option is selected', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should render the options corretly when "True" is selected', () => {
        const component = render(renderBooleanQuestion());
        fireEvent.press(elements.trueOptionButton(component));
        act(() => {
          jest.runAllTimers();
        });
        expect(
          elements.trueOptionButton(component).props.style.backgroundColor,
        ).toEqual(theme.colors.primary);
        expect(
          elements.falseOptionButton(component).props.style.backgroundColor,
        ).toEqual(theme.colors.fallbackImageBackground);
      });

      it('should render the options corretly when "False" is selected', () => {
        const component = render(renderBooleanQuestion());
        fireEvent.press(elements.falseOptionButton(component));
        act(() => {
          jest.runAllTimers();
        });
        expect(
          elements.trueOptionButton(component).props.style.backgroundColor,
        ).toEqual(theme.colors.fallbackImageBackground);
        expect(
          elements.falseOptionButton(component).props.style.backgroundColor,
        ).toEqual(theme.colors.primary);
      });
    });
  });

  describe('Pressing', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should call "onPressNext" correctly when "press" the "True" option', () => {
      const onPressNext = jest.fn();
      const component = render(renderBooleanQuestion(onPressNext));
      fireEvent.press(elements.trueOptionButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(onPressNext).toBeCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPressNext).toBeCalledTimes(1);
      expect(onPressNext).toBeCalledWith('true');
    });

    it('should call "onPressNext" correctly when "press" the "False" option', () => {
      const onPressNext = jest.fn();
      const component = render(renderBooleanQuestion(onPressNext));
      fireEvent.press(elements.falseOptionButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(onPressNext).toBeCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPressNext).toBeCalledTimes(1);
      expect(onPressNext).toBeCalledWith('false');
    });
  });
});
