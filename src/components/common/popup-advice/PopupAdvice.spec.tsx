import React from 'react';
import { render } from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

import PopupAdvice, { HIDE_POPUP_DELAY } from './PopupAdvice';

const DEFAULT_TEXT = 'DEFAULT_TEXT';

const renderPopupAdvice = (onFinishToShow = jest.fn, text = DEFAULT_TEXT) => (
  <ThemeProvider
    theme={dark}
  >
    <PopupAdvice
      onFinishToShow={onFinishToShow}
      text={text}
    />
  </ThemeProvider>
);

jest.useFakeTimers();

describe('Testing <PopupAdvice />', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(renderPopupAdvice());

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message')).not.toBeNull();

    expect(getByText(DEFAULT_TEXT)).not.toBeNull();
  });

  it('should call "onFinishToShow" after the hide-animation to be finished', () => {
    const onFinishToShow = jest.fn();

    render(renderPopupAdvice(onFinishToShow));

    global.timeTravel(HIDE_POPUP_DELAY * 2);

    expect(onFinishToShow).toHaveBeenCalledTimes(1);
  });
});
