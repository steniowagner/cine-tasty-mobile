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
import categories from '../options/categories';

const renderSetupQuestionsCategoriesOptionsList = (
  indexLastOptionSelected = 0,
  onPressSelect = jest.fn(),
  closeModal = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <SetupQuestionsOptionsList
      indexLastOptionSelected={indexLastOptionSelected}
      onPressSelect={onPressSelect}
      closeModal={closeModal}
      options={categories}
    />
  </ThemeProvider>
);

describe('<SetupQuestionsOptionsList /> - Categories', () => {
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

    for (let i = 0; i < categories.length; i++) {
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
        renderSetupQuestionsCategoriesOptionsList(indexItemSelected),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        categories.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        categories.length,
      );
      expect(isItemSelected(component, indexItemSelected)).toEqual(true);
    });

    it('should render correctly after the user "press" on the same item', () => {
      const indexItemSelected = 0;
      const component = render(
        renderSetupQuestionsCategoriesOptionsList(indexItemSelected),
      );
      // First render
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        categories.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        categories.length,
      );
      expect(isItemSelected(component, indexItemSelected)).toEqual(true);
      component.rerender(
        renderSetupQuestionsCategoriesOptionsList(indexItemSelected),
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
        categories.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        categories.length,
      );
      expect(isItemSelected(component, indexItemSelected)).toEqual(true);
    });

    it('should render correctly after the user "press" other item than the current selected', () => {
      const currentItemIndexSelected = randomArrayIndex(categories);
      const nextItemIndexSelected = randomArrayIndex(categories, [
        currentItemIndexSelected,
      ]);
      const component = render(
        renderSetupQuestionsCategoriesOptionsList(currentItemIndexSelected),
      );
      // First render
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.selectButton(component)).not.toBeNull();
      expect(elements.selectButtonText(component).children[0]).toEqual(
        Translations.Tags.SELECT,
      );
      expect(elements.optionListItemButton(component).length).toEqual(
        categories.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        categories.length,
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
        categories.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        categories.length,
      );
      expect(isItemSelected(component, currentItemIndexSelected)).toEqual(
        false,
      );
      expect(isItemSelected(component, nextItemIndexSelected)).toEqual(true);
    });
  });

  describe('Select-Button Pressed', () => {
    it('should call the "onPressSelect" with the current selected option and "closeModal" when the user press the "Select button"', () => {
      const indexLastOptionSelected = randomArrayIndex(categories);
      const onPressSelect = jest.fn();
      const closeModal = jest.fn();
      const component = render(
        renderSetupQuestionsCategoriesOptionsList(
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
      const currentItemIndexSelected = randomArrayIndex(categories);
      const nextItemIndexSelected = randomArrayIndex(categories, [
        currentItemIndexSelected,
      ]);
      const onPressSelect = jest.fn();
      const closeModal = jest.fn();
      const component = render(
        renderSetupQuestionsCategoriesOptionsList(
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
