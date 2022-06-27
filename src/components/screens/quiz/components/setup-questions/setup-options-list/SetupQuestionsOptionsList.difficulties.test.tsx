import React from 'react';
import {
  RenderAPI,
  fireEvent,
  cleanup,
  render,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {randomArrayIndex} from '@mocks/utils';
import {Translations} from '@i18n/tags';

import SetupQuestionsOptionsList from './SetupQuestionsOptionsList';
import difficulties from '../options/difficulties';

const renderSetupQuestionsDifficultiesOptionsList = (
  indexLastOptionSelected = 0,
  onPressSelect = jest.fn(),
  closeModal = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <SetupQuestionsOptionsList
      indexLastOptionSelected={indexLastOptionSelected}
      onPressSelect={onPressSelect}
      closeModal={closeModal}
      options={difficulties}
    />
  </ThemeProvider>
);

describe('<SetupQuestionsOptionsList /> - Difficulties', () => {
  const elements = {
    optionsList: (api: RenderAPI) => api.queryByTestId('options-list'),
    selectButton: (api: RenderAPI) => api.queryByTestId('select-button'),
    selectButtonText: (api: RenderAPI) =>
      api.queryByTestId('select-button-text'),
    optionListItemButton: (api: RenderAPI) =>
      api.getAllByTestId('option-list-item-button'),
    optionListItemText: (api: RenderAPI) =>
      api.getAllByTestId('option-list-item-text'),
    checkboxIcon: (api: RenderAPI) =>
      api.getAllByTestId('icon-checkbox-circle'),
  };
  const isItemSelected = (component: RenderAPI, index: number) => {
    let isNthElementSelected = false;

    for (let i = 0; i < difficulties.length; i++) {
      const parent = elements.optionListItemButton(component)[i];
      for (let j = 0; j < parent.children.length; j++) {
        const props = (parent.children[j] as any).props;
        if (props.id === 'checkbox-circle' && i === index) {
          isNthElementSelected = true;
        }
      }
    }

    return isNthElementSelected;
  };

  describe('Item Selection', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render correctly', () => {
      const indexItemSelected = 0;
      const component = render(
        renderSetupQuestionsDifficultiesOptionsList(indexItemSelected),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        difficulties.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        difficulties.length,
      );
      expect(isItemSelected(component, indexItemSelected)).toEqual(true);
    });

    it('should render correctly after the user "press" on the same item', () => {
      const indexItemSelected = 0;
      const component = render(
        renderSetupQuestionsDifficultiesOptionsList(indexItemSelected),
      );
      // First render
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        difficulties.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        difficulties.length,
      );
      expect(isItemSelected(component, indexItemSelected)).toEqual(true);
      component.rerender(
        renderSetupQuestionsDifficultiesOptionsList(indexItemSelected),
      );
      // Press same item
      fireEvent.press(
        elements.optionListItemButton(component)[indexItemSelected],
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        difficulties.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        difficulties.length,
      );
      expect(isItemSelected(component, indexItemSelected)).toEqual(true);
    });

    it('should render correctly after the user "press" other item than the current selected', () => {
      const currentItemIndexSelected = randomArrayIndex(difficulties);
      const nextItemIndexSelected = randomArrayIndex(difficulties, [
        currentItemIndexSelected,
      ]);
      const component = render(
        renderSetupQuestionsDifficultiesOptionsList(currentItemIndexSelected),
      );
      // First render
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        difficulties.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        difficulties.length,
      );
      expect(isItemSelected(component, currentItemIndexSelected)).toEqual(true);
      expect(isItemSelected(component, nextItemIndexSelected)).toEqual(false);
      // Press another item
      fireEvent.press(
        elements.optionListItemButton(component)[nextItemIndexSelected],
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        difficulties.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        difficulties.length,
      );
      expect(isItemSelected(component, currentItemIndexSelected)).toEqual(
        false,
      );
      expect(isItemSelected(component, nextItemIndexSelected)).toEqual(true);
    });
  });

  describe('Select-Button Pressed', () => {
    it('should call the "onPressSelect" with the current selected option and "closeModal" when the user press the "Select button"', () => {
      const indexLastOptionSelected = randomArrayIndex(difficulties);
      const onPressSelect = jest.fn();
      const closeModal = jest.fn();
      const component = render(
        renderSetupQuestionsDifficultiesOptionsList(
          indexLastOptionSelected,
          onPressSelect,
          closeModal,
        ),
      );
      fireEvent.press(elements.selectButton(component));
      expect(onPressSelect).toHaveBeenCalledTimes(1);
      expect(onPressSelect).toHaveBeenCalledWith(indexLastOptionSelected);
      expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('should call the "onPressSelect" with the current selected option and "closeModal" when the user select a different option than the current and then press the "Select button"', () => {
      const currentItemIndexSelected = randomArrayIndex(difficulties);
      const nextItemIndexSelected = randomArrayIndex(difficulties, [
        currentItemIndexSelected,
      ]);
      const onPressSelect = jest.fn();
      const closeModal = jest.fn();
      const component = render(
        renderSetupQuestionsDifficultiesOptionsList(
          currentItemIndexSelected,
          onPressSelect,
          closeModal,
        ),
      );
      fireEvent.press(
        elements.optionListItemButton(component)[nextItemIndexSelected],
      );
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.press(elements.selectButton(component));
      expect(onPressSelect).toHaveBeenCalledTimes(1);
      expect(onPressSelect).toHaveBeenCalledWith(nextItemIndexSelected);
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
