import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {quizFixtures} from '@mocks/fixtures/quiz';
import {dark as theme} from '@styles/themes/dark';
import {randomArrayIndex} from '@mocks/utils';
import {Translations} from '@i18n/tags';

import MultiChoiceQuestion from './MultiChoiceQuestion';

type CheckOptionParams = {
  elements: Record<string, any>;
  component: RenderAPI;
  indexOption: number;
};

const checkIsOptionSelected = (params: CheckOptionParams) => {
  expect(
    params.elements.multiChoicesButtonTexts(params.component)[
      params.indexOption
    ].props.isSelected,
  ).toEqual(true);
};

const checkIsOptionUnselected = (params: CheckOptionParams) => {
  expect(
    params.elements.multiChoicesButtonTexts(params.component)[
      params.indexOption
    ].props.isSelected,
  ).toEqual(false);
};

const checkIsAllOptionsUnselected = (
  params: Omit<CheckOptionParams, 'indexOption'>,
) => {
  for (let i = 0; i < quizFixtures().multiChoiceOptions.length; i++) {
    checkIsOptionUnselected({...params, indexOption: i});
  }
};

const checkIsOnlyThisOptionSelcted = (params: CheckOptionParams) => {
  for (let i = 0; i < quizFixtures().multiChoiceOptions.length; i++) {
    if (params.indexOption === i) {
      checkIsOptionSelected({...params, indexOption: i});
    } else {
      checkIsOptionUnselected({...params, indexOption: i});
    }
  }
};

const checkIsOptionsRenderedInTheCorrectOrder = (
  elements: Record<string, any>,
  component: RenderAPI,
) => {
  for (let i = 0; i < quizFixtures().multiChoiceOptions.length; i++) {
    expect(elements.multiChoicesButtonTexts(component)[i].children[0]).toEqual(
      quizFixtures().multiChoiceOptions[i],
    );
  }
};

const checkIsNextButtonRenderdCorrectly = (
  elements: Record<string, any>,
  component: RenderAPI,
) => {
  expect(elements.nextButton(component)).not.toBeNull();
  expect(elements.nextButtonText(component).children[0]).toEqual(
    Translations.Tags.QUIZ_NEXT,
  );
};

const renderMultiChoice = (isFocused = true, onPressNext = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <MultiChoiceQuestion
      answers={quizFixtures().multiChoiceOptions}
      onPressNext={onPressNext}
      isFocused={isFocused}
    />
  </ThemeProvider>
);

describe('<MultiChoiceQuestion />', () => {
  const elements = {
    multiChoicesButtons: (api: RenderAPI) =>
      api.queryAllByTestId('multi-choice-option-button'),
    multiChoicesButtonTexts: (api: RenderAPI) =>
      api.queryAllByTestId('multi-choice-option-text'),
    nextButton: (api: RenderAPI) => api.queryByTestId('select-button'),
    nextButtonText: (api: RenderAPI) => api.queryByTestId('select-button-text'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  describe('Renders correctly', () => {
    describe('When "isFocused" is "true"', () => {
      it('should render correctly when there is no option selected and "isFocused" is "true"', () => {
        const component = render(renderMultiChoice());
        expect(elements.multiChoicesButtons(component).length).toEqual(
          quizFixtures().multiChoiceOptions.length,
        );
        checkIsOptionsRenderedInTheCorrectOrder(elements, component);
        checkIsNextButtonRenderdCorrectly(elements, component);
      });
    });

    describe('When "isFocused" is "false"', () => {
      it('should render correctly when there is no option selected and "isFocused" is "false"', () => {
        const component = render(renderMultiChoice(false));
        expect(elements.multiChoicesButtons(component).length).toEqual(
          quizFixtures().multiChoiceOptions.length,
        );
        checkIsOptionsRenderedInTheCorrectOrder(elements, component);
        checkIsNextButtonRenderdCorrectly(elements, component);
      });
    });
  });

  describe('Re-renders correclty', () => {
    it('should keep the default state when it gets unfocused and there is no option selected', () => {
      const component = render(renderMultiChoice());
      expect(elements.multiChoicesButtons(component).length).toEqual(
        quizFixtures().multiChoiceOptions.length,
      );
      checkIsOptionsRenderedInTheCorrectOrder(elements, component);
      checkIsNextButtonRenderdCorrectly(elements, component);
      checkIsAllOptionsUnselected({elements, component});
      component.rerender(renderMultiChoice(false));
      expect(elements.multiChoicesButtons(component).length).toEqual(
        quizFixtures().multiChoiceOptions.length,
      );
      checkIsOptionsRenderedInTheCorrectOrder(elements, component);
      checkIsNextButtonRenderdCorrectly(elements, component);
      checkIsAllOptionsUnselected({elements, component});
    });

    it('should keep the current state when it gets unfocused and the there is some option selected', () => {
      const indexOptionSelected = randomArrayIndex(
        quizFixtures().multiChoiceOptions,
      );
      const component = render(renderMultiChoice());
      fireEvent.press(
        elements.multiChoicesButtons(component)[indexOptionSelected],
      );
      checkIsOptionsRenderedInTheCorrectOrder(elements, component);
      checkIsNextButtonRenderdCorrectly(elements, component);
      checkIsOnlyThisOptionSelcted({
        elements,
        component,
        indexOption: indexOptionSelected,
      });
      component.rerender(renderMultiChoice(false));
      checkIsOptionsRenderedInTheCorrectOrder(elements, component);
      checkIsNextButtonRenderdCorrectly(elements, component);
      checkIsOnlyThisOptionSelcted({
        elements,
        component,
        indexOption: indexOptionSelected,
      });
    });

    it('should keep the current state when it gets focused and the there is some option selected', () => {
      const indexOptionSelected = randomArrayIndex(
        quizFixtures().multiChoiceOptions,
      );
      const component = render(renderMultiChoice(false));
      fireEvent.press(
        elements.multiChoicesButtons(component)[indexOptionSelected],
      );
      checkIsOptionsRenderedInTheCorrectOrder(elements, component);
      checkIsNextButtonRenderdCorrectly(elements, component);
      checkIsOnlyThisOptionSelcted({
        elements,
        component,
        indexOption: indexOptionSelected,
      });
      component.rerender(renderMultiChoice(true));
      checkIsOptionsRenderedInTheCorrectOrder(elements, component);
      checkIsNextButtonRenderdCorrectly(elements, component);
      checkIsOnlyThisOptionSelcted({
        elements,
        component,
        indexOption: indexOptionSelected,
      });
    });
  });

  describe('Pressing the items', () => {
    it('should only update the state of the pressed option when there was no option selected', () => {
      const indexOptionSelected = randomArrayIndex(
        quizFixtures().multiChoiceOptions,
      );
      const component = render(renderMultiChoice());
      checkIsAllOptionsUnselected({elements, component});
      fireEvent.press(
        elements.multiChoicesButtons(component)[indexOptionSelected],
      );
      act(() => {
        jest.runAllTimers();
      });
      checkIsOnlyThisOptionSelcted({
        indexOption: indexOptionSelected,
        elements,
        component,
      });
    });

    it('should only update the state of the pressed option when there is some option selected', () => {
      const indexFirstOptionSelected = randomArrayIndex(
        quizFixtures().multiChoiceOptions,
      );
      const indexSecondOptionSelected = randomArrayIndex(
        quizFixtures().multiChoiceOptions,
        [indexFirstOptionSelected],
      );
      const component = render(renderMultiChoice());
      fireEvent.press(
        elements.multiChoicesButtons(component)[indexFirstOptionSelected],
      );
      checkIsOnlyThisOptionSelcted({
        elements,
        component,
        indexOption: indexFirstOptionSelected,
      });
      fireEvent.press(
        elements.multiChoicesButtons(component)[indexSecondOptionSelected],
      );
      checkIsOnlyThisOptionSelcted({
        indexOption: indexSecondOptionSelected,
        elements,
        component,
      });
    });
  });

  describe('Pressing the "Next" button', () => {
    it('should call "onPress" correctly when the user selects some option and press "NEXT"', () => {
      const onPress = jest.fn();
      const optionSelectedIndex = randomArrayIndex(
        quizFixtures().multiChoiceOptions,
      );
      const component = render(renderMultiChoice(true, onPress));
      fireEvent.press(
        elements.multiChoicesButtons(component)[optionSelectedIndex],
      );
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith(
        quizFixtures().multiChoiceOptions[optionSelectedIndex],
      );
    });
  });
});
