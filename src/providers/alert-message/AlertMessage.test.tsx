jest.unmock('react-native-reanimated');
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';

import {AlertMessageProvider, useAlertMessage} from './AlertMessageContext';
import {HIDE_POPUP_DELAY} from './useAlertMessage';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const SOME_ALERT_MESSAGE = 'SOME_ALERT_MESSAGE';

const renderAlertMessage = () => {
  const ChildrenComponent = () => {
    const alertMessage = useAlertMessage();
    return (
      <TouchableOpacity
        testID="show-message-button"
        onPress={() => alertMessage.show(SOME_ALERT_MESSAGE)}
      />
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <AlertMessageProvider>
        <ChildrenComponent />
      </AlertMessageProvider>
    </ThemeProvider>
  );
};

describe('<AlertMessageProvider />', () => {
  beforeEach(setupTimeTravel);

  const elements = {
    showMessageButton: (api: RenderAPI) =>
      api.queryByTestId('show-message-button'),
    alertMessageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    alertMessageText: (api: RenderAPI) =>
      api.queryByTestId('alert-message-text'),
  };

  it('should show the "alert-message" correctly', async () => {
    const component = render(renderAlertMessage());
    expect(elements.alertMessageWrapper(component)).toBeNull();
    fireEvent.press(elements.showMessageButton(component));
    expect(elements.alertMessageWrapper(component)).not.toBeNull();
    expect(elements.alertMessageText(component).children[0]).toEqual(
      SOME_ALERT_MESSAGE,
    );
    act(() => {
      jest.runAllTimers();
    });
  });

  it(`should remove the "alert-message" after ${HIDE_POPUP_DELAY}ms`, async () => {
    const component = render(renderAlertMessage());
    expect(elements.alertMessageWrapper(component)).toBeNull();
    fireEvent.press(elements.showMessageButton(component));
    expect(elements.alertMessageWrapper(component)).not.toBeNull();
    act(() => {
      timeTravel(HIDE_POPUP_DELAY);
    });
    await waitFor(() => {
      expect(elements.alertMessageWrapper(component)).toBeNull();
    });
  });
});
