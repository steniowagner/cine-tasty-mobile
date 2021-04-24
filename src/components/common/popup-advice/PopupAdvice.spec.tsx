import React from 'react';
import { cleanup, render } from '@testing-library/react-native';

import { ThemeContextProvider } from '@providers';

import timeTravel, { setupTimeTravel } from '../../../../__mocks__/timeTravel';
import PopupAdvice, { HIDE_POPUP_DELAY } from './PopupAdvice';

const DEFAULT_TEXT = 'DEFAULT_TEXT';

const renderPopupAdvice = (onFinishToShow = jest.fn, text = DEFAULT_TEXT) => (
  <ThemeContextProvider>
    <PopupAdvice onFinishToShow={onFinishToShow} text={text} />
  </ThemeContextProvider>
);

describe('Testing <PopupAdvice />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(renderPopupAdvice());

    expect(getByTestId('popup-advice-wrapper')).not.toBeNull();

    expect(getByTestId('popup-advice-message')).not.toBeNull();

    expect(getByText(DEFAULT_TEXT)).not.toBeNull();
  });

  it('should call "onFinishToShow" after the hide-animation to be finished', () => {
    const onFinishToShow = jest.fn();

    render(renderPopupAdvice(onFinishToShow));

    timeTravel(HIDE_POPUP_DELAY * 2);

    expect(onFinishToShow).toHaveBeenCalledTimes(1);
  });
});
