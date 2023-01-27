import React from 'react';
import {
  RenderAPI,
  fireEvent,
  render,
  cleanup,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {randomArrayElement, randomArrayIndex} from '@mocks/utils';
import * as Types from '@local-types';

import {SelectableOptionsModal} from './SelectableOptionsModal';
import * as options from '../../hooks/make-selectable-options-datasets/options';
import {OptionsSelectedContext} from '../../provider/OptionsSelectedProvider';
import {Translations} from '@i18n/tags';

import {parseOptions} from '../../hooks/make-selectable-options-datasets/parseOptions';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const checkIsPressCTACalledWithCorrectParams = (
  onPressModalOptionsCta: jest.Mock,
  optionSelected: ReturnType<typeof parseOptions>[number],
  i18nSection: Translations.Tags,
) => {
  expect(onPressModalOptionsCta.mock.calls[0][0].value).toEqual(
    optionSelected.value,
  );
  expect(onPressModalOptionsCta.mock.calls[0][0].id).toEqual(optionSelected.id);
  expect(onPressModalOptionsCta.mock.calls[0][0].option).toEqual(
    optionSelected.option,
  );
  expect(onPressModalOptionsCta.mock.calls[0][0].label).toEqual(
    `${i18nSection}_${optionSelected.value.toLowerCase()}`,
  );
  expect(typeof onPressModalOptionsCta.mock.calls[0][0].isEquals).toEqual(
    'function',
  );
};

const renderSelectableOptionsModal = (
  activeOption: any,
  onPressModalOptionsCta?: jest.Mock,
) => (
  <ThemeProvider theme={theme}>
    <OptionsSelectedContext.Provider
      value={{
        onPressOptionSection: jest.fn(),
        onPressModalOptionsCta: onPressModalOptionsCta || jest.fn(),
        selectedOptions: {
          difficulty: options.difficulties[0],
          category: options.categories[0],
          type: options.types[0],
        },
        activeOption,
      }}>
      <SelectableOptionsModal
        onCloseSetupQuestionModal={jest.fn()}
        isSetupQuestionModalOpen
      />
    </OptionsSelectedContext.Provider>
  </ThemeProvider>
);

describe('<SelectableOptionsModal />', () => {
  const elements = {
    optionsList: (api: RenderAPI) => api.queryByTestId('options-list'),
    optionListItemButton: (api: RenderAPI) =>
      api.getAllByTestId('option-list-item-button'),
    modalSelectButton: (api: RenderAPI) => api.queryByTestId('select-button'),
    optionsListItemsText: (api: RenderAPI) =>
      api.queryAllByTestId('option-list-item-text'),
  };

  const makeRenderSelectableOptionsModalParams = (
    dataset: Types.QuizFilterOption[],
    i18nLabel: Translations.Tags,
  ) => {
    const baseOptionSelected = randomArrayElement(dataset);
    return {
      ...baseOptionSelected,
      label: i18nLabel,
    };
  };

  describe('When the options are the categories', () => {
    const dataset = options.categories as ReturnType<
      typeof parseOptions
    >[number][];
    const i18nLabel = Translations.Tags.QUIZ_CATEGORY;

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render correctly', () => {
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
        ),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.optionListItemButton(component).length).toEqual(
        dataset.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        dataset.length,
      );
    });

    it('should render the options in the correct order', () => {
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
        ),
      );
      elements.optionsListItemsText(component).forEach((element, index) => {
        expect(element.children[0]).toEqual(
          `${i18nLabel}_${dataset[index].value.toLocaleLowerCase()}`,
        );
      });
    });

    it('should call the "onPressModalOptionsCta" correctly when the user selects an option and press the "ModalCTA-button"', async () => {
      const onPressModalOptionsCta = jest.fn();
      const indexNewOptionSelected = randomArrayIndex(dataset);
      const optionSelected = dataset[indexNewOptionSelected];
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
          onPressModalOptionsCta,
        ),
      );
      fireEvent.press(
        elements.optionListItemButton(component)[indexNewOptionSelected],
      );
      fireEvent.press(elements.modalSelectButton(component));
      expect(onPressModalOptionsCta).toHaveBeenCalledTimes(1);
      checkIsPressCTACalledWithCorrectParams(
        onPressModalOptionsCta,
        optionSelected,
        i18nLabel,
      );
    });
  });

  describe('When the options are the difficulties', () => {
    const dataset = options.difficulties as ReturnType<
      typeof parseOptions
    >[number][];
    const i18nLabel = Translations.Tags.QUIZ_DIFFICULTY;

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(cleanup);

    it('should render correctly', () => {
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
        ),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.optionListItemButton(component).length).toEqual(
        dataset.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        dataset.length,
      );
    });

    it('should render the options in the correct order', () => {
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
        ),
      );
      elements.optionsListItemsText(component).forEach((element, index) => {
        expect(element.children[0]).toEqual(
          `${i18nLabel}_${dataset[index].value.toLocaleLowerCase()}`,
        );
      });
    });

    it('should call the "onPressModalOptionsCta" correctly when the user selects an option and press the "ModalCTA-button"', async () => {
      const onPressModalOptionsCta = jest.fn();
      const indexNewOptionSelected = randomArrayIndex(dataset);
      const optionSelected = dataset[indexNewOptionSelected];
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
          onPressModalOptionsCta,
        ),
      );
      fireEvent.press(
        elements.optionListItemButton(component)[indexNewOptionSelected],
      );
      fireEvent.press(elements.modalSelectButton(component));
      expect(onPressModalOptionsCta).toHaveBeenCalledTimes(1);
      checkIsPressCTACalledWithCorrectParams(
        onPressModalOptionsCta,
        optionSelected,
        i18nLabel,
      );
    });
  });

  describe('When the options are the types', () => {
    const dataset = options.types as ReturnType<typeof parseOptions>[number][];
    const i18nLabel = Translations.Tags.QUIZ_TYPE;

    it('should render correctly', () => {
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
        ),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.optionListItemButton(component).length).toEqual(
        dataset.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        dataset.length,
      );
    });

    it('should render the options in the correct order', () => {
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
        ),
      );
      elements.optionsListItemsText(component).forEach((element, index) => {
        expect(element.children[0]).toEqual(
          `${i18nLabel}_${dataset[index].value.toLocaleLowerCase()}`,
        );
      });
    });

    it('should call the "onPressModalOptionsCta" correctly when the user selects an option and press the "ModalCTA-button"', async () => {
      const onPressModalOptionsCta = jest.fn();
      const indexNewOptionSelected = randomArrayIndex(dataset);
      const optionSelected = dataset[indexNewOptionSelected];
      const component = render(
        renderSelectableOptionsModal(
          makeRenderSelectableOptionsModalParams(dataset, i18nLabel),
          onPressModalOptionsCta,
        ),
      );
      fireEvent.press(
        elements.optionListItemButton(component)[indexNewOptionSelected],
      );
      fireEvent.press(elements.modalSelectButton(component));
      expect(onPressModalOptionsCta).toHaveBeenCalledTimes(1);
      checkIsPressCTACalledWithCorrectParams(
        onPressModalOptionsCta,
        optionSelected,
        i18nLabel,
      );
    });
  });
});
