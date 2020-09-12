import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import SetupQuestionsOptionsList, {
  I18N_SELECT_BUTTON_KEY,
} from './SetupQuestionsOptionsList';
import { types } from '../options';

type Props = {
  onPressSelect: (indexOptionSelected: number) => void;
  indexLastOptionSelected: number;
  closeModal: () => void;
};

const renderSetupQuestionsTypeOptionsList = ({
  indexLastOptionSelected = 0,
  onPressSelect = jest.fn,
  closeModal = jest.fn,
}: Props) => (
  <ThemeProvider theme={dark}>
    <SetupQuestionsOptionsList
      indexLastOptionSelected={indexLastOptionSelected}
      onPressSelect={onPressSelect}
      closeModal={closeModal}
      options={types}
    />
  </ThemeProvider>
);

describe('Testing <SetupQuestionsOptionsList /> - [Type]', () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render correctly', () => {
    const indexLastOptionSelected = 0;

    const { getAllByTestId, getByText, getByTestId } = render(
      renderSetupQuestionsTypeOptionsList({
        indexLastOptionSelected,
        onPressSelect: jest.fn,
        closeModal: jest.fn,
      }),
    );

    expect(getByTestId('options-list')).not.toBeNull();

    expect(getByTestId('select-button')).not.toBeNull();

    expect(getByText(I18N_SELECT_BUTTON_KEY)).not.toBeNull();

    expect(getAllByTestId('option-list-item').length).toEqual(types.length);

    const listItemTexts = getAllByTestId('list-item-text');

    expect(listItemTexts[indexLastOptionSelected].props.isSelected).toEqual(true);

    expect(
      listItemTexts
        .slice(1)
        .every(listItemText => listItemText.props.isSelected === false),
    ).toEqual(true);
  });

  it('should change the selected item when the user press a different item than the current', () => {
    const indexCurrentOptionSelected = 0;
    const indexNewOptionSelected = 1;

    const { getAllByTestId } = render(
      renderSetupQuestionsTypeOptionsList({
        indexLastOptionSelected: indexCurrentOptionSelected,
        onPressSelect: jest.fn,
        closeModal: jest.fn,
      }),
    );

    const listItemTexts = getAllByTestId('list-item-text');

    expect(listItemTexts[indexCurrentOptionSelected].props.isSelected).toEqual(true);

    expect(
      listItemTexts
        .slice(1)
        .every(listItemText => listItemText.props.isSelected === false),
    ).toEqual(true);

    fireEvent.press(getAllByTestId('option-list-item')[indexNewOptionSelected]);

    act(() => {
      jest.runAllTimers();
    });

    expect(listItemTexts[indexNewOptionSelected].props.isSelected).toEqual(true);

    expect(
      listItemTexts
        .filter((item, index) => index !== indexNewOptionSelected)
        .every(listItemText => listItemText.props.isSelected === false),
    ).toEqual(true);
  });

  it("shouldn't change the selected item when the user press the selected item", () => {
    const indexOptionSelected = 2;

    const { getAllByTestId } = render(
      renderSetupQuestionsTypeOptionsList({
        indexLastOptionSelected: indexOptionSelected,
        onPressSelect: jest.fn,
        closeModal: jest.fn,
      }),
    );

    const listItemTexts = getAllByTestId('list-item-text');

    expect(listItemTexts[indexOptionSelected].props.isSelected).toEqual(true);

    expect(
      listItemTexts
        .filter((item, index) => index !== indexOptionSelected)
        .every(listItemText => listItemText.props.isSelected === false),
    ).toEqual(true);

    fireEvent.press(getAllByTestId('option-list-item')[indexOptionSelected]);

    act(() => {
      jest.runAllTimers();
    });

    expect(listItemTexts[indexOptionSelected].props.isSelected).toEqual(true);

    expect(
      listItemTexts
        .filter((item, index) => index !== indexOptionSelected)
        .every(listItemText => listItemText.props.isSelected === false),
    ).toEqual(true);
  });

  it('should call the "onPressSelect" with the current selected option and "closeModal" when the user press the "Select button"', () => {
    const indexLastOptionSelected = 1;
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
