import React from 'react';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {randomArrayIndex} from '@mocks/utils';
import * as Types from '@local-types';

import {SetupQuestionsOptionsList} from './SetupQuestionsOptionsList';
import * as options from '../options';

type RenderSetupQuestionsCategoriesOptionsListParams = {
  indexOptionSelected: number;
  onSelectOption?: (indexOptionSelected: number) => void;
  options: Types.QuizFilterOption[];
};

const renderSetupQuestionsCategoriesOptionsList = (
  props: RenderSetupQuestionsCategoriesOptionsListParams,
) => (
  <ThemeProvider theme={theme}>
    <SetupQuestionsOptionsList
      indexOptionSelected={props.indexOptionSelected}
      onSelectOption={props.onSelectOption || jest.fn()}
      options={props.options}
    />
  </ThemeProvider>
);

describe('<SetupQuestionsOptionsList />', () => {
  const elements = {
    optionsList: (api: RenderAPI) => api.queryByTestId('options-list'),
    optionListItemButton: (api: RenderAPI) =>
      api.getAllByTestId('option-list-item-button'),
  };

  describe('When the options are the categories', () => {
    const dataset = options.categories;

    it('should render correctly', () => {
      const indexOptionSelected = randomArrayIndex(dataset);
      const component = render(
        renderSetupQuestionsCategoriesOptionsList({
          indexOptionSelected,
          options: dataset,
        }),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.optionListItemButton(component).length).toEqual(
        dataset.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        dataset.length,
      );
    });

    it('should call "onSelectOption" correctly when the user selects an option', () => {
      const indexOptionCurrentlySelected = randomArrayIndex(dataset);
      const indexNewOptionSelected = randomArrayIndex(dataset);
      const onSelectOption = jest.fn();
      const component = render(
        renderSetupQuestionsCategoriesOptionsList({
          indexOptionSelected: indexOptionCurrentlySelected,
          options: dataset,
          onSelectOption,
        }),
      );
      fireEvent.press(
        elements.optionListItemButton(component)[indexNewOptionSelected],
      );
      expect(onSelectOption).toHaveBeenCalledTimes(1);
      expect(onSelectOption).toHaveBeenCalledWith(indexNewOptionSelected);
    });
  });

  describe('When the options are the difficulties', () => {
    const dataset = options.difficulties;

    it('should render correctly', () => {
      const indexOptionSelected = randomArrayIndex(dataset);
      const component = render(
        renderSetupQuestionsCategoriesOptionsList({
          indexOptionSelected,
          options: dataset,
        }),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.optionListItemButton(component).length).toEqual(
        dataset.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        dataset.length,
      );
    });

    it('should call "onSelectOption" correctly when the user selects an option', () => {
      const indexOptionCurrentlySelected = randomArrayIndex(dataset);
      const indexNewOptionSelected = randomArrayIndex(dataset);
      const onSelectOption = jest.fn();
      const component = render(
        renderSetupQuestionsCategoriesOptionsList({
          indexOptionSelected: indexOptionCurrentlySelected,
          options: dataset,
          onSelectOption,
        }),
      );
      fireEvent.press(
        elements.optionListItemButton(component)[indexNewOptionSelected],
      );
      expect(onSelectOption).toHaveBeenCalledTimes(1);
      expect(onSelectOption).toHaveBeenCalledWith(indexNewOptionSelected);
    });
  });

  describe('When the options are the types', () => {
    const dataset = options.types;

    it('should render correctly', () => {
      const indexOptionSelected = randomArrayIndex(dataset);
      const component = render(
        renderSetupQuestionsCategoriesOptionsList({
          indexOptionSelected,
          options: dataset,
        }),
      );
      expect(elements.optionsList(component)).not.toBeNull();
      expect(elements.optionListItemButton(component).length).toEqual(
        dataset.length,
      );
      expect(elements.optionsList(component).children.length).toEqual(
        dataset.length,
      );
    });

    it('should call "onSelectOption" correctly when the user selects an option', () => {
      const indexOptionCurrentlySelected = randomArrayIndex(dataset);
      const indexNewOptionSelected = randomArrayIndex(dataset);
      const onSelectOption = jest.fn();
      const component = render(
        renderSetupQuestionsCategoriesOptionsList({
          indexOptionSelected: indexOptionCurrentlySelected,
          options: dataset,
          onSelectOption,
        }),
      );
      fireEvent.press(
        elements.optionListItemButton(component)[indexNewOptionSelected],
      );
      expect(onSelectOption).toHaveBeenCalledTimes(1);
      expect(onSelectOption).toHaveBeenCalledWith(indexNewOptionSelected);
    });
  });
});
