import React from 'react';
import {RenderAPI, cleanup, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';

import {HIDE_POPUP_DELAY} from './useAlertMessage';
import {AlertMessage} from './AlertMessage';

const DEFAULT_TEXT = 'DEFAULT_TEXT';

const renderAlertMessage = (
  onFinishToShow = jest.fn(),
  message = DEFAULT_TEXT,
) => (
  <ThemeProvider theme={theme}>
    <AlertMessage onFinishToShow={onFinishToShow} message={message} />
  </ThemeProvider>
);

describe('<AlertMessage />', () => {
  beforeEach(() => {
    setupTimeTravel();
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  const elements = {
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
  };

  it('should render correctly', () => {
    const component = render(renderAlertMessage());
    expect(elements.alertMessageWrapper(component)).not.toBeNull();
    expect(elements.alertMessageText(component)).not.toBeNull();
    expect(elements.alertMessageText(component).children[0]).toEqual(
      DEFAULT_TEXT,
    );
  });

  it('should call "onFinishToShow" after the hide-animation to be finished', () => {
    const onFinishToShow = jest.fn();
    render(renderAlertMessage(onFinishToShow));
    expect(onFinishToShow).toHaveBeenCalledTimes(0);
    timeTravel(HIDE_POPUP_DELAY * 2);
    expect(onFinishToShow).toHaveBeenCalledTimes(1);
  });
});
