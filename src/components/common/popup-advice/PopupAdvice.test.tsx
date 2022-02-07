import React from 'react';
import {RenderAPI, cleanup, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';

import PopupAdvice, {HIDE_POPUP_DELAY} from './PopupAdvice';

const DEFAULT_TEXT = 'DEFAULT_TEXT';

const renderPopupAdvice = (onFinishToShow = jest.fn, text = DEFAULT_TEXT) => (
  <ThemeProvider theme={theme}>
    <PopupAdvice onFinishToShow={onFinishToShow} text={text} />
  </ThemeProvider>
);

describe('<PopupAdvice />', () => {
  beforeEach(() => {
    setupTimeTravel();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  const elements = {
    popupAdviceWrapper: (api: RenderAPI) =>
      api.queryByTestId('popup-advice-wrapper'),
    popupAdviceMessage: (api: RenderAPI) =>
      api.queryByTestId('popup-advice-message'),
  };

  it('should render correctly', () => {
    const component = render(renderPopupAdvice());
    expect(elements.popupAdviceWrapper(component)).not.toBeNull();
    expect(elements.popupAdviceMessage(component)).not.toBeNull();
    expect(elements.popupAdviceMessage(component).children[0]).toEqual(
      DEFAULT_TEXT,
    );
  });

  it('should call "onFinishToShow" after the hide-animation to be finished', () => {
    const onFinishToShow = jest.fn();
    render(renderPopupAdvice(onFinishToShow));
    expect(onFinishToShow).toHaveBeenCalledTimes(0);
    timeTravel(HIDE_POPUP_DELAY * 2);
    expect(onFinishToShow).toHaveBeenCalledTimes(1);
  });
});
