import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {multiChoiceOptions} from '@mocks/fixtures';
import {dark as theme} from '@styles/themes/dark';
import {randomArrayIndex} from '@mocks/utils';
import {Translations} from '@i18n/tags';

import MultiChoiceQuestion from './MultiChoiceQuestion';

const renderMultiChoice = (isFocused = true, onPressNext = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <MultiChoiceQuestion
      answers={multiChoiceOptions}
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
    checkIcons: (api: RenderAPI) =>
      api.queryAllByTestId('icon-checkbox-circle'),
    circleIcons: (api: RenderAPI) =>
      api.queryAllByTestId('icon-checkbox-blank-circle-outline'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  describe('Renders correctly', () => {
    it('should render correctly when there is no option selected and "isFocused" is "true"', () => {
      const component = render(renderMultiChoice());
      expect(elements.multiChoicesButtons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.multiChoicesButtonTexts(component).length).toEqual(
        multiChoiceOptions.length,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].children[0],
        ).toEqual(multiChoiceOptions[i]);
      }
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[0].props.isSelected,
        ).toEqual(false);
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.checkIcons(component).length).toEqual(0);
    });
  });

  describe('Rerenders correclty', () => {
    it('should keep the default state when it gets unfocused and there is no option selected', () => {
      // When "isFocused" is "true"
      const component = render(renderMultiChoice());
      expect(elements.multiChoicesButtons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.multiChoicesButtonTexts(component).length).toEqual(
        multiChoiceOptions.length,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].children[0],
        ).toEqual(multiChoiceOptions[i]);
      }
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[0].props.isSelected,
        ).toEqual(false);
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.checkIcons(component).length).toEqual(0);
      // When "isFocused" is "false"
      component.rerender(renderMultiChoice(false));
      expect(elements.multiChoicesButtons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.multiChoicesButtonTexts(component).length).toEqual(
        multiChoiceOptions.length,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].children[0],
        ).toEqual(multiChoiceOptions[i]);
      }
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[0].props.isSelected,
        ).toEqual(false);
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.checkIcons(component).length).toEqual(0);
    });

    it('should keep the current state when it gets unfocused and the there is some option selected', () => {
      const optionSelectedIndex = randomArrayIndex(multiChoiceOptions);
      // When "isFocused" is "true"
      const component = render(renderMultiChoice());
      fireEvent.press(
        elements.multiChoicesButtons(component)[optionSelectedIndex],
      );
      expect(elements.multiChoicesButtons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.multiChoicesButtonTexts(component).length).toEqual(
        multiChoiceOptions.length,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].children[0],
        ).toEqual(multiChoiceOptions[i]);
      }
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        if (optionSelectedIndex === i) {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(true);
        } else {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(false);
        }
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length - 1,
      );
      expect(elements.checkIcons(component).length).toEqual(1);
      // When "isFocused" is "false"
      component.rerender(renderMultiChoice(false));
      expect(elements.multiChoicesButtons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.multiChoicesButtonTexts(component).length).toEqual(
        multiChoiceOptions.length,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].children[0],
        ).toEqual(multiChoiceOptions[i]);
      }
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        if (optionSelectedIndex === i) {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(true);
        } else {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(false);
        }
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length - 1,
      );
      expect(elements.checkIcons(component).length).toEqual(1);
    });

    it('should keep the current state when it gets focused and the there is some option selected', () => {
      const optionSelectedIndex = randomArrayIndex(multiChoiceOptions);
      // When "isFocused" is "true"
      const component = render(renderMultiChoice(false));
      fireEvent.press(
        elements.multiChoicesButtons(component)[optionSelectedIndex],
      );
      expect(elements.multiChoicesButtons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.multiChoicesButtonTexts(component).length).toEqual(
        multiChoiceOptions.length,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].children[0],
        ).toEqual(multiChoiceOptions[i]);
      }
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        if (optionSelectedIndex === i) {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(true);
        } else {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(false);
        }
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length - 1,
      );
      expect(elements.checkIcons(component).length).toEqual(1);
      // When "isFocused" is "false"
      component.rerender(renderMultiChoice(true));
      expect(elements.multiChoicesButtons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.multiChoicesButtonTexts(component).length).toEqual(
        multiChoiceOptions.length,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].children[0],
        ).toEqual(multiChoiceOptions[i]);
      }
      expect(elements.nextButton(component)).not.toBeNull();
      expect(elements.nextButtonText(component).children[0]).toEqual(
        Translations.Tags.QUIZ_NEXT,
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        if (optionSelectedIndex === i) {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(true);
        } else {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(false);
        }
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length - 1,
      );
      expect(elements.checkIcons(component).length).toEqual(1);
    });
  });

  describe('Press item', () => {
    it('should only update the state of the pressed option when there was no option selected', () => {
      const optionSelectedIndex = randomArrayIndex(multiChoiceOptions);
      const component = render(renderMultiChoice());
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        expect(
          elements.multiChoicesButtonTexts(component)[i].props.isSelected,
        ).toEqual(false);
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length,
      );
      expect(elements.checkIcons(component).length).toEqual(0);
      fireEvent.press(
        elements.multiChoicesButtons(component)[optionSelectedIndex],
      );
      act(() => {
        jest.runAllTimers();
      });
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        if (optionSelectedIndex === i) {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(true);
        } else {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(false);
        }
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length - 1,
      );
      expect(elements.checkIcons(component).length).toEqual(1);
    });

    it('should only update the state of the pressed option when there is some option selected', () => {
      const firstOptionSelectedIndex = randomArrayIndex(multiChoiceOptions);
      const secondOptionSelectedIndex = randomArrayIndex(multiChoiceOptions, [
        firstOptionSelectedIndex,
      ]);
      // With the first option selected
      const component = render(renderMultiChoice());
      fireEvent.press(
        elements.multiChoicesButtons(component)[firstOptionSelectedIndex],
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        if (firstOptionSelectedIndex === i) {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(true);
        } else {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(false);
        }
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length - 1,
      );
      expect(elements.checkIcons(component).length).toEqual(1);
      // With the second option selected
      fireEvent.press(
        elements.multiChoicesButtons(component)[secondOptionSelectedIndex],
      );
      for (let i = 0; i < multiChoiceOptions.length; i++) {
        if (secondOptionSelectedIndex === i) {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(true);
        } else {
          expect(
            elements.multiChoicesButtonTexts(component)[i].props.isSelected,
          ).toEqual(false);
        }
      }
      expect(elements.circleIcons(component).length).toEqual(
        multiChoiceOptions.length - 1,
      );
      expect(elements.checkIcons(component).length).toEqual(1);
    });
  });

  describe('onPress Next-button', () => {
    it('should disable the "NEXT" button when there is no option selected', () => {
      const onPress = jest.fn();
      const component = render(renderMultiChoice(true, onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(0);
    });

    it('should call "onPress" correctly when the user selects some option and press "NEXT"', () => {
      const onPress = jest.fn();
      const optionSelectedIndex = randomArrayIndex(multiChoiceOptions);
      const component = render(renderMultiChoice(true, onPress));
      fireEvent.press(
        elements.multiChoicesButtons(component)[optionSelectedIndex],
      );
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.nextButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onPress).toHaveBeenCalledWith(
        multiChoiceOptions[optionSelectedIndex],
      );
    });
  });
});
