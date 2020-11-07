import React from 'react';
import { ThemeProvider } from 'styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react-native';

import { dark } from 'styles/themes';

import BooleanQuestion, {
  FALSE_TEXT_I18N_REF,
  TRUE_TEXT_I18N_REF,
} from './BooleanQuestion';

const renderBooleanQuestion = (onPressNext = jest.fn()) => (
  <ThemeProvider theme={dark}>
    <BooleanQuestion onPressNext={onPressNext} isFocused />
  </ThemeProvider>
);

describe('Testing <BooleanQuestion />', () => {
  afterEach(cleanup);

  it("it should render correctly when there's no option selected", () => {
    const { getByTestId, getByText } = render(renderBooleanQuestion());

    expect(getByTestId('boolean-question').props.children.length).toBe(2);

    expect(getByText(TRUE_TEXT_I18N_REF)).not.toBeNull();

    expect(getByText(FALSE_TEXT_I18N_REF)).not.toBeNull();

    expect(getByTestId('true-option-button')).not.toBeNull();

    expect(getByTestId('false-option-button')).not.toBeNull();
  });

  it('it should render correctly when the "TRUE" option is selected', () => {
    const { getByTestId, queryByTestId } = render(renderBooleanQuestion());

    expect(getByTestId('true-option-button')).not.toBeNull();

    expect(queryByTestId('true-option-button-selected')).toBeNull();

    expect(getByTestId('false-option-button')).not.toBeNull();

    expect(queryByTestId('false-option-button-selected')).toBeNull();

    fireEvent.press(getByTestId('true-option-button'));

    expect(queryByTestId('true-option-button')).toBeNull();

    expect(getByTestId('true-option-button-selected')).not.toBeNull();

    expect(getByTestId('false-option-button')).not.toBeNull();

    expect(queryByTestId('false-option-button-selected')).toBeNull();
  });

  it('it should render correctly when the "FALSE" option is selected', () => {
    const { getByTestId, queryByTestId } = render(renderBooleanQuestion());

    expect(getByTestId('false-option-button')).not.toBeNull();

    expect(queryByTestId('false-option-button-selected')).toBeNull();

    expect(getByTestId('true-option-button')).not.toBeNull();

    expect(queryByTestId('true-option-button-selected')).toBeNull();

    fireEvent.press(getByTestId('false-option-button'));

    expect(queryByTestId('false-option-button')).toBeNull();

    expect(getByTestId('false-option-button-selected')).not.toBeNull();

    expect(getByTestId('true-option-button')).not.toBeNull();

    expect(queryByTestId('true-option-button-selected')).toBeNull();
  });

  it('it should call "onPressNext" with "true" when the "TRUE" option is selected and the "NEXT" button is pressed', () => {
    const onPressNext = jest.fn();

    const { getByTestId } = render(renderBooleanQuestion(onPressNext));

    fireEvent.press(getByTestId('true-option-button'));

    fireEvent.press(getByTestId('next-button'));

    expect(onPressNext).toBeCalledTimes(1);

    expect(onPressNext).toHaveBeenCalledWith('true');
  });

  it('it should call "onPressNext" with "false" when the "FALSE" option is selected and the "NEXT" button is pressed', () => {
    const onPressNext = jest.fn();

    const { getByTestId } = render(renderBooleanQuestion(onPressNext));

    fireEvent.press(getByTestId('false-option-button'));

    fireEvent.press(getByTestId('next-button'));

    expect(onPressNext).toBeCalledTimes(1);

    expect(onPressNext).toHaveBeenCalledWith('false');
  });
});
