import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

import theme from '@styles/theme';

import MultiChoiceQuestion from './MultiChoiceQuestion';

const mockedAnswers = ['A', 'B', 'C', 'D'];

const renderMultiChoice = (onPressNext = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <MultiChoiceQuestion onPressNext={onPressNext} answers={mockedAnswers} isFocused />
  </ThemeProvider>
);

describe('Testing <MultiChoiceQuestion />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it("it should render correctly when there's no answer selected", () => {
    const { getByTestId, getAllByTestId } = render(renderMultiChoice());

    expect(getByTestId('multi-choice-options').props.data.length).toBe(
      mockedAnswers.length,
    );

    expect(getAllByTestId('icon-checkbox-blank-circle-outline').length).toEqual(
      mockedAnswers.length,
    );
  });

  it('it shoud change the style of them selected item from non-selected-style to selected-style', () => {
    const INDEX_OPTION_SELECTED =
      (Math.random() * (mockedAnswers.length - 1 - 0 + 1)) << 0;
    const onSelectAnswer = jest.fn();

    const { getAllByTestId } = render(renderMultiChoice(onSelectAnswer));

    fireEvent.press(getAllByTestId('multi-choice-answer')[INDEX_OPTION_SELECTED]);

    act(() => {
      jest.runAllTimers();
    });

    expect(
      getAllByTestId(/icon/)
        .filter((_, index) => index !== INDEX_OPTION_SELECTED)
        .every(icon => icon.props.testID === 'icon-checkbox-blank-circle-outline'),
    ).toEqual(true);

    expect(getAllByTestId(/icon/)[INDEX_OPTION_SELECTED].props.testID).toBe(
      'icon-checkbox-circle',
    );
  });

  it('it should change the selected item after every item selection', () => {
    const { getAllByTestId } = render(renderMultiChoice());

    for (let i = 0; i < mockedAnswers.length; i++) {
      fireEvent.press(getAllByTestId('multi-choice-answer')[i]);

      act(() => {
        jest.runAllTimers();
      });

      expect(getAllByTestId(/icon/)[i].props.testID).toBe('icon-checkbox-circle');

      expect(
        getAllByTestId(/icon/)
          .filter((_, index) => index !== i)
          .every(icon => icon.props.testID === 'icon-checkbox-blank-circle-outline'),
      ).toEqual(true);
    }
  });

  it('it should call "onPressNext" with the selected answer', () => {
    const INDEX_OPTION_SELECTED =
      (Math.random() * (mockedAnswers.length - 1 - 0 + 1)) << 0;
    const onPressNext = jest.fn();

    const { getAllByTestId, getByTestId } = render(renderMultiChoice(onPressNext));

    fireEvent.press(getAllByTestId('multi-choice-answer')[INDEX_OPTION_SELECTED]);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('next-button'));

    expect(onPressNext).toBeCalledTimes(1);

    expect(onPressNext).toHaveBeenCalledWith(mockedAnswers[INDEX_OPTION_SELECTED]);
  });
});
