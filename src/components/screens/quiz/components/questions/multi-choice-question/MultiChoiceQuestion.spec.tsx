import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, fireEvent, render } from 'react-native-testing-library';

import { dark } from 'styles/themes';

import MultiChoiceQuestion from './MultiChoiceQuestion';

const mockedAnswers = ['A', 'B', 'C', 'D'];

const indexAnswerSelectedByDefault = 3;

const renderMultiChoice = (
  onSelectAnswer = jest.fn(),
  answerSelected = mockedAnswers[indexAnswerSelectedByDefault],
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

    expect(getAllByTestId('icon')[indexAnswerSelectedByDefault].props.name).toBe(
      'check-circle',
    );
    expect(getAllByTestId('icon')[indexAnswerSelectedByDefault].props.color).toBe(
      'white',
    );
  });

  it('it should call onSelectAnswer with the answer selected', () => {
    const newIndexOptionSelected = 0;
    const onSelectAnswer = jest.fn();

    const { getAllByTestId } = render(renderMultiChoice(onSelectAnswer));

    fireEvent.press(getAllByTestId('multi-choice-answer')[newIndexOptionSelected]);

    expect(onSelectAnswer).toBeCalledTimes(1);

    expect(onSelectAnswer).toHaveBeenCalledWith(mockedAnswers[newIndexOptionSelected]);
  });
});
