import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import SetupQuestionsOptionsList, {
  I18N_SELECT_BUTTON_KEY,
} from './SetupQuestionsOptionsList';
import { types } from '../options';

type Props = {
  onPressSelect?: (indexOptionSelected: number) => void;
  indexLastOptionSelected?: number;
  closeModal?: () => void;
};

const renderSetupQuestionsTypeOptionsList = ({
  indexLastOptionSelected = 0,
  onPressSelect = jest.fn,
  closeModal = jest.fn,
}: Props) => (
  <ThemeProvider theme={theme}>
    <SetupQuestionsOptionsList
      indexLastOptionSelected={indexLastOptionSelected}
      onPressSelect={onPressSelect}
      closeModal={closeModal}
      options={types}
    />
  </ThemeProvider>
);

describe('Testing <SetupQuestionsOptionsList /> - [Type]', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const onPressSelect = jest.fn();

    const { getAllByTestId, getByText, getByTestId } = render(
      renderSetupQuestionsTypeOptionsList({ onPressSelect }),
    );

    expect(getByTestId('options-list')).not.toBeNull();

    expect(getByTestId('select-button')).not.toBeNull();

    expect(getByText(I18N_SELECT_BUTTON_KEY)).not.toBeNull();

    expect(getAllByTestId('option-list-item').length).toEqual(types.length);

    fireEvent.press(getByTestId('select-button'));

    expect(onPressSelect).toHaveBeenCalledTimes(1);

    expect(onPressSelect).toHaveBeenCalledWith(0);
  });

  it('should change the selected item when the user press a different item than the current', () => {
    const indexCurrentOptionSelected = 0;
    const indexNewOptionSelected = (Math.random() * (types.length - 1 - 0 + 1)) << 0;

    const onPressSelect = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSetupQuestionsTypeOptionsList({
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
    const indexOptionSelected = (Math.random() * (types.length - 1 - 0 + 1)) << 0;

    const onPressSelect = jest.fn();

    const { getAllByTestId, getByTestId } = render(
      renderSetupQuestionsTypeOptionsList({
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
    const indexLastOptionSelected = (Math.random() * (types.length - 1 - 0 + 1)) << 0;
    const onPressSelect = jest.fn();
    const closeModal = jest.fn();

    const { getByTestId } = render(
      renderSetupQuestionsTypeOptionsList({
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
      renderSetupQuestionsTypeOptionsList({
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
