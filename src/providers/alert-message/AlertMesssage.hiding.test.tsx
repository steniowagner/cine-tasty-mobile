jest.unmock('react-native-reanimated');
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  RenderAPI,
  fireEvent,
  render,
  act,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';
import { Icons } from '@/components/common';

import { AlertMessageProvider, useAlertMessage } from './AlertMessageContext';
import { HIDE_DELAY } from './use-alert-message';

const SOME_ALERT_MESSAGE = 'SOME_ALERT_MESSAGE';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    call: () => {},
    ReduceMotion: {
      System: 'system',
    },
  };
});

const renderAlertMessage = (icon?: Icons) => {
  const ChildComponent = () => {
    const alertMessage = useAlertMessage();

    return (
      <TouchableOpacity
        testID="show-message-button"
        onPress={() => alertMessage.show(SOME_ALERT_MESSAGE, icon)}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <AlertMessageProvider>
        <ChildComponent />
      </AlertMessageProvider>
    </ThemeProvider>
  );
};

describe('Providers/AlertMessage/Hiding', () => {
  const elements = {
    showMessageButton: (api: RenderAPI) =>
      api.getByTestId('show-message-button'),
    messageWrapper: (api: RenderAPI) =>
      api.queryByTestId('alert-message-wrapper'),
    messageText: (api: RenderAPI) => api.queryByTestId('alert-message-text'),
    icon: (api: RenderAPI) => api.queryByTestId('alert-message-icon'),
  };

  describe('Alert-content', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it(`should "hide" the "alert-message" after ${HIDE_DELAY}ms`, () => {
      const componente = render(renderAlertMessage('github'));
      act(() => {
        fireEvent.press(elements.showMessageButton(componente));
      });
      expect(elements.messageWrapper(componente)).not.toBeNull();
      expect(elements.icon(componente)).not.toBeNull();
      expect(elements.messageText(componente)).not.toBeNull();
      act(() => {
        jest.advanceTimersByTime(HIDE_DELAY);
      });
      expect(elements.messageWrapper(componente)).toBeNull();
      expect(elements.icon(componente)).toBeNull();
      expect(elements.messageText(componente)).toBeNull();
    });
  });
});
