import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';

import { ThemeContextProvider } from '@providers';
import { answers } from '@mocks/fixtures';

import MultiChoiceQuestion from './MultiChoiceQuestion';

const renderMultiChoice = (onPressNext = jest.fn()) => (
  <ThemeContextProvider>
    <MultiChoiceQuestion onPressNext={onPressNext} answers={answers} isFocused />
  </ThemeContextProvider>
);

describe('Testing <MultiChoiceQuestion />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it("it should render correctly when there's no answer selected", () => {
    const { getByTestId, getAllByTestId } = render(renderMultiChoice());

    expect(getByTestId('multi-choice-options').props.data.length).toBe(answers.length);

    expect(getAllByTestId('icon-checkbox-blank-circle-outline').length).toEqual(
      answers.length,
    );
  });

  it('it shoud change the style of them selected item from non-selected-style to selected-style', () => {
    const INDEX_OPTION_SELECTED = (Math.random() * (answers.length - 1 - 0 + 1)) << 0;
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

    for (let i = 0; i < answers.length; i++) {
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
    const INDEX_OPTION_SELECTED = (Math.random() * (answers.length - 1 - 0 + 1)) << 0;
    const onPressNext = jest.fn();

    const { getAllByTestId, getByTestId } = render(renderMultiChoice(onPressNext));

    fireEvent.press(getAllByTestId('multi-choice-answer')[INDEX_OPTION_SELECTED]);

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getByTestId('next-button'));

    expect(onPressNext).toBeCalledTimes(1);

    expect(onPressNext).toHaveBeenCalledWith(answers[INDEX_OPTION_SELECTED]);
  });
});
