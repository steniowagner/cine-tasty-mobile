import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';

import MultiChoiceQuestionListItem from './MultiChoiceQuestionListItem';

const DEFAULT_ANSWER = 'DEFAULT_ANSWER';

const renderMultiChoiceQuestionListItem = (
  onSelectAnswer = jest.fn(),
  isSelected = false,
) => (
  <ThemeProvider theme={theme}>
    <MultiChoiceQuestionListItem
      onSelectAnswer={onSelectAnswer}
      answer={DEFAULT_ANSWER}
      isSelected={isSelected}
    />
  </ThemeProvider>
);

describe('Quiz/Questions/MultiChoiceQuestionListItem', () => {
  const elements = {
    button: (api: RenderAPI) => api.getByTestId('multi-choice-option-button'),
    text: (api: RenderAPI) => api.getByTestId('multi-choice-option-text'),
    checkedIcon: (api: RenderAPI) => api.queryByTestId('icon-checkbox-circle'),
    uncheckedIcon: (api: RenderAPI) =>
      api.queryByTestId('checkbox-blank-circle-outline'),
  };

  describe('Render', () => {
    describe('When "isSelected" is "true"', () => {
      it('should render with the "correct styles"', () => {
        const component = render(
          renderMultiChoiceQuestionListItem(jest.fn(), true),
        );
        expect(elements.button(component).props.style.backgroundColor).toEqual(
          theme.colors.primary,
        );
        expect(elements.button(component).props.style.borderTopColor).toEqual(
          theme.colors.primary,
        );
        expect(elements.button(component).props.style.borderRightColor).toEqual(
          theme.colors.primary,
        );
        expect(
          elements.button(component).props.style.borderBottomColor,
        ).toEqual(theme.colors.primary);
        expect(elements.button(component).props.style.borderLeftColor).toEqual(
          theme.colors.primary,
        );
      });

      it('should render the "correct icon"', () => {
        const component = render(
          renderMultiChoiceQuestionListItem(jest.fn(), true),
        );
        expect(elements.checkedIcon(component)).not.toBeNull();
        expect(elements.uncheckedIcon(component)).toBeNull();
      });
    });

    describe('When "isSelected" is "false"', () => {
      it('should render correctly when "isSelected" is "false"', () => {
        const component = render(renderMultiChoiceQuestionListItem());
        expect(elements.button(component).props.style.backgroundColor).toEqual(
          theme.colors.white,
        );
        expect(elements.button(component).props.style.borderTopColor).toEqual(
          theme.colors.buttonText,
        );
        expect(elements.button(component).props.style.borderRightColor).toEqual(
          theme.colors.buttonText,
        );
        expect(
          elements.button(component).props.style.borderBottomColor,
        ).toEqual(theme.colors.buttonText);
        expect(elements.button(component).props.style.borderLeftColor).toEqual(
          theme.colors.buttonText,
        );
      });

      it('should render the "correct icon"', () => {
        const component = render(
          renderMultiChoiceQuestionListItem(jest.fn(), true),
        );
        expect(elements.checkedIcon(component)).not.toBeNull();
        expect(elements.uncheckedIcon(component)).toBeNull();
      });
    });
  });

  describe('Pressing', () => {
    it('should call "onSelectAnswer" when pressed', () => {
      const onSelectAnswer = jest.fn();
      const component = render(
        renderMultiChoiceQuestionListItem(onSelectAnswer),
      );
      expect(onSelectAnswer).toBeCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onSelectAnswer).toBeCalledTimes(1);
    });
  });
});
