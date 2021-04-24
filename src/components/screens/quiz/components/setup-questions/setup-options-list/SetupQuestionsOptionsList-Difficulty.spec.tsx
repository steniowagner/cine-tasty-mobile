import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';

import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';

import SetupQuestionsOptionsList from './SetupQuestionsOptionsList';
import { difficulties } from '../options';

type RenderSetupQuestionsDifficultyOptionsListProps = {
  onPressSelect?: (indexOptionSelected: number) => void;
  indexLastOptionSelected?: number;
  closeModal?: () => void;
};

const renderSetupQuestionsDifficultyOptionsList = ({
  indexLastOptionSelected = 0,
  onPressSelect = jest.fn,
  closeModal = jest.fn,
}: RenderSetupQuestionsDifficultyOptionsListProps) => (
  <ThemeContextProvider>
    <SetupQuestionsOptionsList
      indexLastOptionSelected={indexLastOptionSelected}
      onPressSelect={onPressSelect}
      closeModal={closeModal}
      options={difficulties}
    />
  </ThemeContextProvider>
);

describe('Testing <SetupQuestionsOptionsList /> - [Difficulty]', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const onPressSelect = jest.fn();

    const { getAllByTestId, getByText, getByTestId } = render(
      renderSetupQuestionsDifficultyOptionsList({ onPressSelect }),
    );

    expect(getByTestId('options-list')).not.toBeNull();

    expect(getByTestId('select-button')).not.toBeNull();

    expect(getByText(TRANSLATIONS.SELECT)).not.toBeNull();

    expect(getAllByTestId('option-list-item').length).toEqual(difficulties.length);

    fireEvent.press(getByTestId('select-button'));

    expect(onPressSelect).toHaveBeenCalledTimes(1);

    expect(onPressSelect).toHaveBeenCalledWith(0);
  });

  it('should change the selected item when the user press a different item than the current', () => {
    const indexCurrentOptionSelected = 0;
    const indexNewOptionSelected =
      (Math.random() * (difficulties.length - 1 - 0 + 1)) << 0;

    const onPressSelect = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSetupQuestionsDifficultyOptionsList({
        indexLastOptionSelected: indexCurrentOptionSelected,
        onPressSelect,
      }),
    );

    fireEvent.press(getAllByTestId('option-list-item')[indexNewOptionSelected]);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('select-button'));

    expect(onPressSelect).toHaveBeenCalledWith(indexNewOptionSelected);
  });

  it("shouldn't change the selected item when the user press the selected item", () => {
    const indexOptionSelected = (Math.random() * (difficulties.length - 1 - 0 + 1)) << 0;

    const onPressSelect = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSetupQuestionsDifficultyOptionsList({
        indexLastOptionSelected: indexOptionSelected,
        onPressSelect,
      }),
    );

    fireEvent.press(getByTestId('select-button'));

    expect(onPressSelect).toHaveBeenCalledWith(indexOptionSelected);

    fireEvent.press(getAllByTestId('option-list-item')[indexOptionSelected]);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('select-button'));

    expect(onPressSelect).toHaveBeenCalledWith(indexOptionSelected);
  });

  it('should call the "onPressSelect" with the current selected option and "closeModal" when the user press the "Select button"', () => {
    const indexLastOptionSelected =
      (Math.random() * (difficulties.length - 1 - 0 + 1)) << 0;
    const onPressSelect = jest.fn();
    const closeModal = jest.fn();

    const { getByTestId } = render(
      renderSetupQuestionsDifficultyOptionsList({
        indexLastOptionSelected,
        onPressSelect,
        closeModal,
      }),
    );

    fireEvent.press(getByTestId('select-button'));

    expect(onPressSelect).toHaveBeenCalledTimes(1);

    expect(onPressSelect).toHaveBeenCalledWith(indexLastOptionSelected);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('should call the "onPressSelect" with the current selected option and "closeModal" when the user select a different option than the current and then press the "Select button"', () => {
    const indexLastOptionSelected = 0;
    const onPressSelect = jest.fn();
    const closeModal = jest.fn();

    const indexNewOptionSelected = 1;

    const { getAllByTestId, getByTestId } = render(
      renderSetupQuestionsDifficultyOptionsList({
        indexLastOptionSelected,
        onPressSelect,
        closeModal,
      }),
    );

    fireEvent.press(getAllByTestId('option-list-item')[indexNewOptionSelected]);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('select-button'));

    expect(onPressSelect).toHaveBeenCalledTimes(1);

    expect(onPressSelect).toHaveBeenCalledWith(indexNewOptionSelected);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
