import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react-native';

import { dark } from 'styles/themes';

import BooleanQuestion from './BooleanQuestion';

const renderBooleanQuestion = (onSelectAnswer = jest.fn(), answerSelected?: string) => (
  <ThemeProvider theme={dark}>
    <BooleanQuestion onSelectAnswer={onSelectAnswer} answerSelected={answerSelected} />
  </ThemeProvider>
);

describe('Testing <BooleanQuestion />', () => {
  afterEach(cleanup);

  it('it should render correctly', () => {
    const { getByTestId, queryByTestId, getByText } = render(renderBooleanQuestion());

    expect(getByTestId('boolean-question').props.children.length).toBe(2);

    expect(getByText('True')).not.toBeNull();

    expect(getByText('False')).not.toBeNull();

    expect(getByTestId('true-option-button')).not.toBeNull();

    expect(getByTestId('false-option-button')).not.toBeNull();

    expect(queryByTestId('true-option-button-selected')).toBeNull();

    expect(queryByTestId('false-option-button-selected')).toBeNull();
  });

  it('it should render correctly when the True option is selected', () => {
    const { getByTestId, queryByTestId } = render(
      renderBooleanQuestion(undefined, 'true'),
    );

    expect(getByTestId('true-option-button-selected')).not.toBeNull();

    expect(getByTestId('false-option-button')).not.toBeNull();

    expect(queryByTestId('false-option-button-selected')).toBeNull();

    expect(queryByTestId('true-option-button')).toBeNull();
  });

  it('it should render correctly when the False option is selected', () => {
    const { queryByTestId, getByTestId } = render(
      renderBooleanQuestion(undefined, 'false'),
    );

    expect(getByTestId('false-option-button-selected')).not.toBeNull();

    expect(getByTestId('true-option-button')).not.toBeNull();

    expect(queryByTestId('true-option-button-selected')).toBeNull();

    expect(queryByTestId('false-option-button')).toBeNull();
  });

  it('it should call onSelectAnswer with "true" when the True button is pressed', () => {
    const onSelectAnswer = jest.fn();

    const { getByTestId } = render(renderBooleanQuestion(onSelectAnswer));

    fireEvent.press(getByTestId('true-option-button'));

    expect(onSelectAnswer).toBeCalledTimes(1);

    expect(onSelectAnswer).toHaveBeenCalledWith('true');
  });

  it('it should call onSelectAnswer with "false" when the False button is pressed', () => {
    const onSelectAnswer = jest.fn();

    const { getByTestId } = render(renderBooleanQuestion(onSelectAnswer));

    fireEvent.press(getByTestId('false-option-button'));

    expect(onSelectAnswer).toBeCalledTimes(1);

    expect(onSelectAnswer).toHaveBeenCalledWith('false');
  });
});
