import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, fireEvent, render } from 'react-native-testing-library';

import { dark } from 'styles/themes';

import BooleanQuestion from './BooleanQuestion';

const renderMultiChoice = (onSelectAnswer = jest.fn(), answerSelected?: string) => (
  <ThemeProvider
    theme={dark}
  >
    <BooleanQuestion
      onSelectAnswer={onSelectAnswer}
      answerSelected={answerSelected}
    />
  </ThemeProvider>
);

describe('Testing <BooleanQuestion />', () => {
  afterEach(cleanup);

  it('it should render correctly', () => {
    const { getByTestId } = render(renderMultiChoice());

    expect(getByTestId('boolean-question').props.children.length).toBe(2);

    expect(getByTestId('true-option-button').props.children.props.children).toBe('True');

    expect(getByTestId('false-option-button').props.children.props.children).toBe(
      'False',
    );

    expect(getByTestId('true-option-button').props.isSelected).toBe(false);

    expect(getByTestId('false-option-button').props.isSelected).toBe(false);
  });

  it('it should render correctly when the True option is selected', () => {
    const { getByTestId } = render(renderMultiChoice(undefined, 'true'));

    expect(getByTestId('true-option-button').props.isSelected).toBe(true);

    expect(getByTestId('false-option-button').props.isSelected).toBe(false);
  });

  it('it should render correctly when the False option is selected', () => {
    const { getByTestId } = render(renderMultiChoice(undefined, 'false'));

    expect(getByTestId('true-option-button').props.isSelected).toBe(false);

    expect(getByTestId('false-option-button').props.isSelected).toBe(true);
  });

  it('it should call onSelectAnswer with "true" when the True button is pressed', () => {
    const onSelectAnswer = jest.fn();

    const { getByTestId } = render(renderMultiChoice(onSelectAnswer));

    fireEvent.press(getByTestId('true-option-button'));

    expect(onSelectAnswer).toBeCalledTimes(1);

    expect(onSelectAnswer).toHaveBeenCalledWith('true');
  });

  it('it should call onSelectAnswer with "false" when the False button is pressed', () => {
    const onSelectAnswer = jest.fn();

    const { getByTestId } = render(renderMultiChoice(onSelectAnswer));

    fireEvent.press(getByTestId('false-option-button'));

    expect(onSelectAnswer).toBeCalledTimes(1);

    expect(onSelectAnswer).toHaveBeenCalledWith('false');
  });
});
