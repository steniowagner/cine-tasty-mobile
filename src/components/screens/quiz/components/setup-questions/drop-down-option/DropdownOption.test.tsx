import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {randomArrayElement} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';
import * as Types from '@local-types';

import {DropdownOption} from './DropdownOption';
import * as options from '../options';

const renderDropdownOption = (
  option: Types.QuizOption,
  selectedOption: string,
  onPress = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <DropdownOption
      selectedOption={selectedOption}
      option={option}
      onPress={onPress}
    />
  </ThemeProvider>
);

describe('<DropdownOption />', () => {
  const elements = {
    dropdownDifficultyButton: (api: RenderAPI) =>
      api.queryByTestId('dropdown-button-difficulty'),
    dropdownDifficultyText: (api: RenderAPI) =>
      api.queryByTestId('dropdown-value-difficulty'),
    dropdownCategoryButton: (api: RenderAPI) =>
      api.queryByTestId('dropdown-button-category'),
    dropdownCategoryText: (api: RenderAPI) =>
      api.queryByTestId('dropdown-value-category'),
    dropdownTypeButton: (api: RenderAPI) =>
      api.queryByTestId('dropdown-button-type'),
    dropdownTypeText: (api: RenderAPI) =>
      api.queryByTestId('dropdown-value-type'),
  };

  afterEach(cleanup);

  describe('Button Press', () => {
    it('should call the "onPress" correctly when the user presses the "dropdown-button" when the "option" is "difficulty"', () => {
      const onPress = jest.fn();
      const randomDifficulty = randomArrayElement(options.difficulties);
      const component = render(
        renderDropdownOption('difficulty', randomDifficulty.id, onPress),
      );
      fireEvent.press(elements.dropdownDifficultyButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should call the "onPress" correctly when the user presses the "dropdown-button" when the "option" is "category"', () => {
      const onPress = jest.fn();
      const randomCategory = randomArrayElement(options.categories);
      const component = render(
        renderDropdownOption('category', randomCategory.id, onPress),
      );
      fireEvent.press(elements.dropdownCategoryButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should call the "onPress" correctly when the user presses the "dropdown-button" when the "option" is "type"', () => {
      const onPress = jest.fn();
      const randomType = randomArrayElement(options.types);
      const component = render(
        renderDropdownOption('type', randomType.id, onPress),
      );
      fireEvent.press(elements.dropdownTypeButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Render Options', () => {
    describe('Difficulty', () => {
      it('should render correctly for the "difficulty-mixed" option', () => {
        const component = render(renderDropdownOption('difficulty', 'mixed'));
        expect(elements.dropdownDifficultyButton(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component).children[0]).toEqual(
          'mixed',
        );
      });

      it('should render correctly for the "difficulty-easy" option', () => {
        const component = render(renderDropdownOption('difficulty', 'easy'));
        expect(elements.dropdownDifficultyButton(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component).children[0]).toEqual(
          'easy',
        );
      });

      it('should render correctly for the "difficulty-medium" option', () => {
        const component = render(renderDropdownOption('difficulty', 'medium'));
        expect(elements.dropdownDifficultyButton(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component).children[0]).toEqual(
          'medium',
        );
      });

      it('should render correctly for the "difficulty-hard" option', () => {
        const component = render(renderDropdownOption('difficulty', 'hard'));
        expect(elements.dropdownDifficultyButton(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component)).not.toBeNull();
        expect(elements.dropdownDifficultyText(component).children[0]).toEqual(
          'hard',
        );
      });
    });

    describe('Category', () => {
      it('should render correctly for the "category-mixed" option', () => {
        const component = render(renderDropdownOption('category', 'mixed'));
        expect(elements.dropdownCategoryButton(component)).not.toBeNull();
        expect(elements.dropdownCategoryText(component)).not.toBeNull();
        expect(elements.dropdownCategoryText(component).children[0]).toEqual(
          'mixed',
        );
      });

      it('should render correctly for the "category-movies" option', () => {
        const component = render(renderDropdownOption('category', 'movies'));
        expect(elements.dropdownCategoryButton(component)).not.toBeNull();
        expect(elements.dropdownCategoryText(component)).not.toBeNull();
        expect(elements.dropdownCategoryText(component).children[0]).toEqual(
          'movies',
        );
      });

      it('should render correctly for the "category-tv" option', () => {
        const component = render(renderDropdownOption('category', 'tv'));
        expect(elements.dropdownCategoryButton(component)).not.toBeNull();
        expect(elements.dropdownCategoryText(component)).not.toBeNull();
        expect(elements.dropdownCategoryText(component).children[0]).toEqual(
          'tv',
        );
      });
    });

    describe('Type', () => {
      it('should render correctly for the "type-mixed" option', () => {
        const component = render(renderDropdownOption('type', 'mixed'));
        expect(elements.dropdownTypeButton(component)).not.toBeNull();
        expect(elements.dropdownTypeText(component)).not.toBeNull();
        expect(elements.dropdownTypeText(component).children[0]).toEqual(
          'mixed',
        );
      });

      it('should render correctly for the "type-movies" option', () => {
        const component = render(renderDropdownOption('type', 'multiple'));
        expect(elements.dropdownTypeButton(component)).not.toBeNull();
        expect(elements.dropdownTypeText(component)).not.toBeNull();
        expect(elements.dropdownTypeText(component).children[0]).toEqual(
          'multiple',
        );
      });

      it('should render correctly for the "type-boolean" option', () => {
        const component = render(renderDropdownOption('type', 'boolean'));
        expect(elements.dropdownTypeButton(component)).not.toBeNull();
        expect(elements.dropdownTypeText(component)).not.toBeNull();
        expect(elements.dropdownTypeText(component).children[0]).toEqual(
          'boolean',
        );
      });
    });
  });
});
