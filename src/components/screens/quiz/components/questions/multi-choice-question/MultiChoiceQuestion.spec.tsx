import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  cleanup, fireEvent, render, act,
} from 'react-native-testing-library';

import { dark } from 'styles/themes';

import MultiChoiceQuestion from './MultiChoiceQuestion';

const mockedAnswers = ['A', 'B', 'C', 'D'];

const renderMultiChoice = (
  onSelectAnswer = jest.fn(),
  answerSelected?: string,
  answers = mockedAnswers,
) => (
  <ThemeProvider
    theme={dark}
  >
    <MultiChoiceQuestion
      onSelectAnswer={onSelectAnswer}
      answerSelected={answerSelected}
      answers={answers}
    />
  </ThemeProvider>
);

jest.useFakeTimers();

describe('Testing <MultiChoiceQuestion />', () => {
  afterEach(cleanup);

  it('it should render correctly', () => {
    const { getByTestId, getAllByTestId } = render(renderMultiChoice());

    expect(getByTestId('multi-choice-options').props.data.length).toBe(
      mockedAnswers.length,
    );

    expect(getAllByTestId('icon')[0].props.name).toBe('checkbox-blank-circle-outline');
    expect(getAllByTestId('icon')[0].props.color).toBe('rgba(0, 0, 0, 0.8)');

    expect(getAllByTestId('icon')[1].props.name).toBe('checkbox-blank-circle-outline');
    expect(getAllByTestId('icon')[1].props.color).toBe('rgba(0, 0, 0, 0.8)');

    expect(getAllByTestId('icon')[2].props.name).toBe('checkbox-blank-circle-outline');
    expect(getAllByTestId('icon')[2].props.color).toBe('rgba(0, 0, 0, 0.8)');

    expect(getAllByTestId('icon')[3].props.name).toBe('checkbox-blank-circle-outline');
    expect(getAllByTestId('icon')[3].props.color).toBe('rgba(0, 0, 0, 0.8)');
  });

  it('it should call onSelectAnswer with the answer selected', () => {
    const onSelectAnswer = jest.fn();
    const indexOptionSelected = 0;

    const { getAllByTestId } = render(
      renderMultiChoice(onSelectAnswer, mockedAnswers[indexOptionSelected]),
    );

    fireEvent.press(getAllByTestId('multi-choice-answer')[indexOptionSelected]);

    expect(onSelectAnswer).toBeCalledTimes(1);

    expect(onSelectAnswer).toHaveBeenCalledWith(mockedAnswers[indexOptionSelected]);
  });

  it('it shoud change the style of them selected item from non-selected-style to selected-style', () => {
    const indexOptionSelected = 2;
    const onSelectAnswer = jest.fn();

    const { getAllByTestId } = render(
      renderMultiChoice(onSelectAnswer, mockedAnswers[indexOptionSelected]),
    );

    fireEvent.press(getAllByTestId('multi-choice-answer')[indexOptionSelected]);

    act(() => {
      jest.runAllTimers();
    });

    expect(getAllByTestId('icon')[0].props.name).toBe('checkbox-blank-circle-outline');
    expect(getAllByTestId('icon')[0].props.color).toBe('rgba(0, 0, 0, 0.8)');

    expect(getAllByTestId('icon')[1].props.name).toBe('checkbox-blank-circle-outline');
    expect(getAllByTestId('icon')[1].props.color).toBe('rgba(0, 0, 0, 0.8)');

    expect(getAllByTestId('icon')[indexOptionSelected].props.name).toBe('check-circle');
    expect(getAllByTestId('icon')[indexOptionSelected].props.color).toBe('white');

    expect(getAllByTestId('icon')[3].props.name).toBe('checkbox-blank-circle-outline');
    expect(getAllByTestId('icon')[3].props.color).toBe('rgba(0, 0, 0, 0.8)');
  });
});
