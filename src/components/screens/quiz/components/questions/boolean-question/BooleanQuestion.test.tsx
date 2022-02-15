import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import BooleanQuestion from './BooleanQuestion';

const renderBooleanQuestion = (onPressNext = jest.fn(), isFocused = true) => (
  <ThemeProvider theme={theme}>
    <BooleanQuestion onPressNext={onPressNext} isFocused={isFocused} />
  </ThemeProvider>
);

describe('<BooleanQuestion />', () => {
  const elements = {
    trueOptionButton: (api: RenderAPI) =>
      api.queryByTestId('true-option-button'),
    trueOptionText: (api: RenderAPI) => api.queryByTestId('true-option-text'),
    falseOptionButton: (api: RenderAPI) =>
      api.queryByTestId('false-option-button'),
    falseOptionText: (api: RenderAPI) => api.queryByTestId('false-option-text'),
    nextButton: (api: RenderAPI) => api.queryByTestId('select-button'),
    nextButtonText: (api: RenderAPI) => api.queryByTestId('select-button-text'),
  };

  afterEach(cleanup);

  describe('Renders correctly', () => {
    it("should render correctly when there's no option selected and 'isFocused' is 'true'", () => {
      const component = render(renderBooleanQuestion());
      expect(elements.trueOptionButton(component)).not.toBeNull();
      expect(elements.trueOptionText(component)).not.toBeNull();
      expect(elements.trueOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TRUE,
      );
      expect(elements.falseOptionButton(component)).not.toBeNull();
      expect(elements.falseOptionText(component)).not.toBeNull();
      expect(elements.falseOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_FALSE,
      );
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
    });

    it('should disable the "NEXT" button when there is no option selected', () => {
      const onPress = jest.fn();
      const component = render(renderBooleanQuestion(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(0);
    });
  });

  describe('Rerenders correctly', () => {
    it('should keep the default state when it gets unfocused and there is no option selected', () => {
      // When "isFocused" is "true"
      const component = render(renderBooleanQuestion());
      expect(elements.trueOptionButton(component)).not.toBeNull();
      expect(elements.trueOptionText(component)).not.toBeNull();
      expect(elements.trueOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TRUE,
      );
      expect(elements.falseOptionButton(component)).not.toBeNull();
      expect(elements.falseOptionText(component)).not.toBeNull();
      expect(elements.falseOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_FALSE,
      );
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      // When "isFocused" is "false"
      component.rerender(renderBooleanQuestion(undefined, false));
      expect(elements.trueOptionButton(component)).not.toBeNull();
      expect(elements.trueOptionText(component)).not.toBeNull();
      expect(elements.trueOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TRUE,
      );
      expect(elements.falseOptionButton(component)).not.toBeNull();
      expect(elements.falseOptionText(component)).not.toBeNull();
      expect(elements.falseOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_FALSE,
      );
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
    });

    it('should keep the current state when it gets unfocused and the "TRUE" option is selected', () => {
      // When "isFocused" is "true"
      const component = render(renderBooleanQuestion());
      fireEvent.press(elements.trueOptionButton(component));
      expect(elements.trueOptionButton(component)).not.toBeNull();
      expect(elements.trueOptionText(component)).not.toBeNull();
      expect(elements.trueOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TRUE,
      );
      expect(elements.falseOptionButton(component)).not.toBeNull();
      expect(elements.falseOptionText(component)).not.toBeNull();
      expect(elements.falseOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_FALSE,
      );
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      // When "isFocused" is "false"
      component.rerender(renderBooleanQuestion(undefined, false));
      expect(elements.trueOptionButton(component)).not.toBeNull();
      expect(elements.trueOptionText(component)).not.toBeNull();
      expect(elements.trueOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TRUE,
      );
      expect(elements.falseOptionButton(component)).not.toBeNull();
      expect(elements.falseOptionText(component)).not.toBeNull();
      expect(elements.falseOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_FALSE,
      );
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
    });

    it('should keep the current state when it gets unfocused and the "FALSE" option is selected', () => {
      // When "isFocused" is "true"
      const component = render(renderBooleanQuestion());
      fireEvent.press(elements.falseOptionButton(component));
      expect(elements.trueOptionButton(component)).not.toBeNull();
      expect(elements.trueOptionText(component)).not.toBeNull();
      expect(elements.trueOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TRUE,
      );
      expect(elements.falseOptionButton(component)).not.toBeNull();
      expect(elements.falseOptionText(component)).not.toBeNull();
      expect(elements.falseOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_FALSE,
      );
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      // When "isFocused" is "false"
      component.rerender(renderBooleanQuestion(undefined, false));
      expect(elements.trueOptionButton(component)).not.toBeNull();
      expect(elements.trueOptionText(component)).not.toBeNull();
      expect(elements.trueOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_TRUE,
      );
      expect(elements.falseOptionButton(component)).not.toBeNull();
      expect(elements.falseOptionText(component)).not.toBeNull();
      expect(elements.falseOptionText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_FALSE,
      );
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
    });
  });

  describe('Enable/Disable press', () => {
    it('should enable "NEXT" button when choose "TRUE" option', () => {
      const onPress = jest.fn();
      const component = render(renderBooleanQuestion(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.trueOptionButton(component));
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should enable "NEXT" button when choose "FALSE" option', () => {
      const onPress = jest.fn();
      const component = render(renderBooleanQuestion(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.falseOptionButton(component));
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should keep "FALSE" option disabled when the user selects the "TRUE" option when there is no option selected', () => {
      const component = render(renderBooleanQuestion());
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      fireEvent.press(elements.trueOptionButton(component));
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
    });

    it('should keep "TRUE" option disabled when the user selects the "FALSE" option when there is no option selected', () => {
      const component = render(renderBooleanQuestion());
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      fireEvent.press(elements.falseOptionButton(component));
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
    });

    it('should make the "FALSE" option-button disabled if it is selected and the user selects the "TRUE" option', () => {
      const component = render(renderBooleanQuestion());
      fireEvent.press(elements.falseOptionButton(component));
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      fireEvent.press(elements.trueOptionButton(component));
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
    });

    it('should make the "TRUE" option-button disabled if it is selected and the user selects the "FALSE" option', () => {
      const component = render(renderBooleanQuestion());
      fireEvent.press(elements.trueOptionButton(component));
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
      fireEvent.press(elements.falseOptionButton(component));
      expect(
        elements.falseOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.primary);
      expect(
        elements.trueOptionButton(component).props.style.backgroundColor,
      ).toEqual(theme.colors.fallbackImageBackground);
    });
  });

  describe('onPress Next-button', () => {
    it('should call "onPress" correctly when the user selects "TRUE" option and press "NEXT"', () => {
      const onPress = jest.fn();
      const component = render(renderBooleanQuestion(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.trueOptionButton(component));
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith('true');
    });

    it('should call "onPress" correctly when the user selects "FALSE" option and press "NEXT"', () => {
      const onPress = jest.fn();
      const component = render(renderBooleanQuestion(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.falseOptionButton(component));
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith('false');
    });
  });
});
