import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import BooleanQuestion from './BooleanQuestion';

type Elements = Record<string, any>;

type BaseCheckParams = {
  elements: Elements;
  component: RenderAPI;
};

type CheckIsOptionSelectedParams = BaseCheckParams & {
  option: 'true' | 'false';
};

const checkIsOptionUnselected = (params: CheckIsOptionSelectedParams) => {
  const unselectedOption =
    params.option === 'true'
      ? params.elements.trueOptionButton
      : params.elements.falseOptionButton;
  expect(
    unselectedOption(params.component).props.style.backgroundColor,
  ).toEqual(theme.colors.fallbackImageBackground);
};

const checkIsOptionSelected = (params: CheckIsOptionSelectedParams) => {
  const selectedOption =
    params.option === 'true'
      ? params.elements.trueOptionButton
      : params.elements.falseOptionButton;
  expect(selectedOption(params.component).props.style.backgroundColor).toEqual(
    theme.colors.primary,
  );
};

const checkIsTrueOptionRenderedWithDefaultConfiguration = (
  params: BaseCheckParams,
) => {
  expect(params.elements.trueOptionButton(params.component)).not.toBeNull();
  expect(params.elements.trueOptionText(params.component)).not.toBeNull();
  expect(params.elements.trueOptionText(params.component).children[0]).toEqual(
    Translations.Tags.QUIZ_TRUE,
  );
};

const checkIsFalseOptionRenderedWithDefaultConfiguration = (
  params: BaseCheckParams,
) => {
  expect(params.elements.falseOptionButton(params.component)).not.toBeNull();
  expect(params.elements.falseOptionText(params.component)).not.toBeNull();
  expect(params.elements.falseOptionText(params.component).children[0]).toEqual(
    Translations.Tags.QUIZ_FALSE,
  );
};

const checkIsNextButtonRenderedWithDefaultConfiguration = (
  params: BaseCheckParams,
) => {
  expect(params.elements.nextButton(params.component)).not.toBeNull();
  expect(params.elements.nextButtonText(params.component).children[0]).toEqual(
    Translations.Tags.QUIZ_NEXT,
  );
};

const checkIsComponentsRenderedCorrectly = (params: BaseCheckParams) => {
  checkIsTrueOptionRenderedWithDefaultConfiguration(params);
  checkIsFalseOptionRenderedWithDefaultConfiguration(params);
  checkIsNextButtonRenderedWithDefaultConfiguration(params);
};

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
    describe('When "isFocused" is "true"', () => {
      it('should render correctly when there is no option selected', () => {
        const component = render(renderBooleanQuestion());
        checkIsComponentsRenderedCorrectly({elements, component});
        checkIsOptionUnselected({elements, component, option: 'true'});
        checkIsOptionUnselected({elements, component, option: 'false'});
        expect(elements.nextButton(component).props.style.opacity).toEqual(0.5);
      });
    });

    describe('When "isFocused" is "false"', () => {
      it('should render correctly when there is no option selected', () => {
        const component = render(renderBooleanQuestion(jest.fn(), false));
        checkIsComponentsRenderedCorrectly({elements, component});
        checkIsOptionUnselected({elements, component, option: 'true'});
        checkIsOptionUnselected({elements, component, option: 'false'});
        expect(elements.nextButton(component).props.style.opacity).toEqual(0.5);
      });
    });
  });

  describe('Re-renders correctly', () => {
    it('should keep the default state when it gets unfocused and there is no option selected', () => {
      const component = render(renderBooleanQuestion());
      checkIsComponentsRenderedCorrectly({elements, component});
      checkIsOptionUnselected({elements, component, option: 'true'});
      checkIsOptionUnselected({elements, component, option: 'false'});
      component.rerender(renderBooleanQuestion(undefined, false));
      checkIsComponentsRenderedCorrectly({elements, component});
      checkIsOptionUnselected({elements, component, option: 'true'});
      checkIsOptionUnselected({elements, component, option: 'false'});
    });

    it('should keep the current state when it gets unfocused and the "TRUE" option is selected', () => {
      const component = render(renderBooleanQuestion());
      fireEvent.press(elements.trueOptionButton(component));
      checkIsComponentsRenderedCorrectly({elements, component});
      checkIsOptionSelected({elements, component, option: 'true'});
      checkIsOptionUnselected({elements, component, option: 'false'});
      component.rerender(renderBooleanQuestion(jest.fn(), false));
      checkIsComponentsRenderedCorrectly({elements, component});
      checkIsOptionSelected({elements, component, option: 'true'});
      checkIsOptionUnselected({elements, component, option: 'false'});
    });

    it('should keep the current state when it gets unfocused and the "FALSE" option is selected', () => {
      const component = render(renderBooleanQuestion());
      fireEvent.press(elements.falseOptionButton(component));
      checkIsComponentsRenderedCorrectly({elements, component});
      checkIsOptionSelected({elements, component, option: 'false'});
      checkIsOptionUnselected({elements, component, option: 'true'});
      component.rerender(renderBooleanQuestion(undefined, false));
      checkIsComponentsRenderedCorrectly({elements, component});
      checkIsOptionSelected({elements, component, option: 'false'});
      checkIsOptionUnselected({elements, component, option: 'true'});
    });
  });

  describe('Enabling "NEXT" button', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should enable "NEXT" button when choose "TRUE" option', () => {
      const component = render(renderBooleanQuestion());
      expect(elements.nextButton(component).props.style.opacity).toEqual(0.5);
      fireEvent.press(elements.trueOptionButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.nextButton(component).props.style.opacity).toEqual(1);
    });

    it('should enable "NEXT" button when choose "FALSE" option', () => {
      const component = render(renderBooleanQuestion());
      expect(elements.nextButton(component).props.style.opacity).toEqual(0.5);
      fireEvent.press(elements.falseOptionButton(component));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.nextButton(component).props.style.opacity).toEqual(1);
    });
  });

  describe('Pressing the options', () => {
    describe('Selecting only one option', () => {
      it('should enable render the "TRUE" option correctly after the user presses it', () => {
        const component = render(renderBooleanQuestion());
        fireEvent.press(elements.trueOptionButton(component));
        checkIsOptionSelected({elements, component, option: 'true'});
        checkIsOptionUnselected({elements, component, option: 'false'});
      });

      it('should enable render the "FALSE" option correctly after the user presses it', () => {
        const component = render(renderBooleanQuestion());
        fireEvent.press(elements.falseOptionButton(component));
        checkIsOptionSelected({elements, component, option: 'false'});
        checkIsOptionUnselected({elements, component, option: 'true'});
      });
    });

    describe('Swaping selection', () => {
      it('should render correctly when the user selects the "TRUE" option and then selects the "FALSE" option', () => {
        const component = render(renderBooleanQuestion());
        fireEvent.press(elements.trueOptionButton(component));
        checkIsOptionSelected({elements, component, option: 'true'});
        checkIsOptionUnselected({elements, component, option: 'false'});
        fireEvent.press(elements.falseOptionButton(component));
        checkIsOptionSelected({elements, component, option: 'false'});
        checkIsOptionUnselected({elements, component, option: 'true'});
      });

      it('should render correctly when the user selects the "FALSE" option and then selects the "TRUE" option', () => {
        const component = render(renderBooleanQuestion());
        fireEvent.press(elements.falseOptionButton(component));
        checkIsOptionSelected({elements, component, option: 'false'});
        checkIsOptionUnselected({elements, component, option: 'true'});
        fireEvent.press(elements.trueOptionButton(component));
        checkIsOptionSelected({elements, component, option: 'true'});
        checkIsOptionUnselected({elements, component, option: 'false'});
      });
    });
  });

  describe('Pressing the "Next" button', () => {
    it('should call "onPress" correctly when the user selects "TRUE" option and press the "NEXT" button', () => {
      const onPress = jest.fn();
      const component = render(renderBooleanQuestion(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.trueOptionButton(component));
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith('true');
    });

    it('should call "onPress" correctly when the user selects "FALSE" option and press the "NEXT" button', () => {
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
