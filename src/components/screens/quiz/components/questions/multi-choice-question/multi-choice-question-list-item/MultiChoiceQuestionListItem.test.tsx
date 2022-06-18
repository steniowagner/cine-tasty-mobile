import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import MultiChoiceQuestionListItem from './MultiChoiceQuestionListItem';

const DEFAULT_ANSWER = 'DEFAULT_ANSWER';

const renderMultiChoiceQuestionListItem = (
  isSelected = true,
  onSelectAnswer = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <MultiChoiceQuestionListItem
      onSelectAnswer={onSelectAnswer}
      isSelected={isSelected}
      answer={DEFAULT_ANSWER}
    />
  </ThemeProvider>
);

describe('<MultiChoiceQuestionListItem />', () => {
  const elements = {
    multiChoiseAnswer: (api: RenderAPI) =>
      api.queryByTestId('multi-choice-option-button'),
    multiChoiseAnswerText: (api: RenderAPI) =>
      api.queryByTestId('multi-choice-option-text'),
    checkIcon: (api: RenderAPI) => api.queryByTestId('icon-checkbox-circle'),
    circleIcon: (api: RenderAPI) =>
      api.queryByTestId('icon-checkbox-blank-circle-outline'),
  };

  afterEach(cleanup);

  describe('Renders correctly', () => {
    it('should render correctly when "isSelected" is "false"', () => {
      const component = render(renderMultiChoiceQuestionListItem(false));
      expect(elements.circleIcon(component)).not.toBeNull();
      expect(elements.checkIcon(component)).toBeNull();
      expect(elements.multiChoiseAnswerText(component).children[0]).toEqual(
        DEFAULT_ANSWER,
      );
      expect(
        elements.multiChoiseAnswer(component).props.style.backgroundColor,
      ).toEqual('white');
    });

    it('should render correctly when "isSelected" is "true"', () => {
      const component = render(renderMultiChoiceQuestionListItem());
      expect(elements.circleIcon(component)).toBeNull();
      expect(elements.checkIcon(component)).not.toBeNull();
      expect(elements.multiChoiseAnswerText(component).children[0]).toEqual(
        DEFAULT_ANSWER,
      );
      expect(
        elements.multiChoiseAnswer(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
    });
  });

  describe('Re-renders correctly', () => {
    it('should re-render correctly when "isSelected" was "false" and now it is "true"', () => {
      const component = render(renderMultiChoiceQuestionListItem(false));
      expect(elements.circleIcon(component)).not.toBeNull();
      expect(elements.checkIcon(component)).toBeNull();
      expect(elements.multiChoiseAnswerText(component).children[0]).toEqual(
        DEFAULT_ANSWER,
      );
      expect(
        elements.multiChoiseAnswer(component).props.style.backgroundColor,
      ).toEqual('white');
      component.rerender(renderMultiChoiceQuestionListItem());
      expect(elements.circleIcon(component)).toBeNull();
      expect(elements.checkIcon(component)).not.toBeNull();
      expect(elements.multiChoiseAnswerText(component).children[0]).toEqual(
        DEFAULT_ANSWER,
      );
      expect(
        elements.multiChoiseAnswer(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
    });

    it('should re-render correctly when "isSelected" was "true" and now it is "false"', () => {
      const component = render(renderMultiChoiceQuestionListItem());
      expect(elements.circleIcon(component)).toBeNull();
      expect(elements.checkIcon(component)).not.toBeNull();
      expect(elements.multiChoiseAnswerText(component).children[0]).toEqual(
        DEFAULT_ANSWER,
      );
      expect(
        elements.multiChoiseAnswer(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      component.rerender(renderMultiChoiceQuestionListItem(false));
      expect(elements.circleIcon(component)).not.toBeNull();
      expect(elements.checkIcon(component)).toBeNull();
      expect(elements.multiChoiseAnswerText(component).children[0]).toEqual(
        DEFAULT_ANSWER,
      );
      expect(
        elements.multiChoiseAnswer(component).props.style.backgroundColor,
      ).toEqual('white');
    });
  });

  describe('Press item', () => {
    it('should call the "onSelectAnswer" with the answer provided when user presses the item and "isSelected" is "true"', () => {
      const onSelectAnswer = jest.fn();
      const component = render(
        renderMultiChoiceQuestionListItem(true, onSelectAnswer),
      );
      expect(onSelectAnswer).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.multiChoiseAnswer(component));
      expect(onSelectAnswer).toHaveBeenCalledTimes(1);
      expect(onSelectAnswer).toHaveBeenCalledWith();
    });

    it('should call the "onSelectAnswer" with the answer provided when user presses the item and "isSelected" is "false"', () => {
      const onSelectAnswer = jest.fn();
      const component = render(
        renderMultiChoiceQuestionListItem(false, onSelectAnswer),
      );
      expect(onSelectAnswer).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.multiChoiseAnswer(component));
      expect(onSelectAnswer).toHaveBeenCalledTimes(1);
      expect(onSelectAnswer).toHaveBeenCalledWith();
    });
  });
});