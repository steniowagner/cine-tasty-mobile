import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  RenderAPI,
  fireEvent,
  render,
  act,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';
import { Icons } from '@/components/common';

import { AlertMessageProvider, useAlertMessage } from './AlertMessageContext';
import {
  TRANSLATE_Y_OUTPUT_INTERPOLATION,
  TIMING_SPRING_ANIMATION,
  TIMING_HIDE_ANIMATION,
  HIDE_DELAY,
} from './use-alert-message';

const SOME_ALERT_MESSAGE = 'SOME_ALERT_MESSAGE';

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

describe('Providers/AlertMessage', () => {
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

    it('should render the "alert-components" correctly when it has some "icon" set', () => {
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
    });

    it('should render the "alert-components" correctly when it has no "icon" set', () => {
      const componente = render(renderAlertMessage());
      act(() => {
        fireEvent.press(elements.showMessageButton(componente));
      });
      expect(elements.messageWrapper(componente)).not.toBeNull();
      expect(elements.icon(componente)).toBeNull();
      expect(elements.messageText(componente)).not.toBeNull();
      act(() => {
        jest.advanceTimersByTime(HIDE_DELAY);
      });
    });

    it('should show the "text-message" correctly', async () => {
      const componente = render(renderAlertMessage());
      act(() => {
        fireEvent.press(elements.showMessageButton(componente));
      });
      expect(elements.messageText(componente)?.children[0]).toEqual(
        SOME_ALERT_MESSAGE,
      );
      act(() => {
        jest.advanceTimersByTime(HIDE_DELAY);
      });
    });
  });

  describe('Animation', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should have the correct "animated-style" in the beginning of the animation', () => {
      const componente = render(renderAlertMessage('github'));
      act(() => {
        fireEvent.press(elements.showMessageButton(componente));
      });
      expect(elements.messageWrapper(componente)).toHaveAnimatedStyle({
        opacity: 0,
        transform: [
          {
            translateY: TRANSLATE_Y_OUTPUT_INTERPOLATION[0],
          },
        ],
      });
    });

    it('should have the correct "animated-style" when finishes the first "spring-animation"', () => {
      const componente = render(renderAlertMessage('github'));
      act(() => {
        fireEvent.press(elements.showMessageButton(componente));
      });
      act(() => {
        jest.advanceTimersByTime(HIDE_DELAY / 2);
      });
      expect(elements.messageWrapper(componente)).toHaveAnimatedStyle({
        opacity: 1,
        transform: [
          {
            translateY: TRANSLATE_Y_OUTPUT_INTERPOLATION[1],
          },
        ],
      });
    });

    it('should have the correct "animated-style" when starts the second "spring-animation"', async () => {
      const componente = render(renderAlertMessage('github'));
      act(() => {
        fireEvent.press(elements.showMessageButton(componente));
      });
      act(() => {
        jest.advanceTimersByTime(HIDE_DELAY + TIMING_SPRING_ANIMATION);
      });
      await waitFor(() => {
        const translateY =
          elements.messageWrapper(componente)?.props.animatedStyle.value
            .transform[0].translateY;
        if (translateY) {
          expect(
            elements.messageWrapper(componente)?.props.animatedStyle.opacity,
          ).toEqual(1);
          expect(TRANSLATE_Y_OUTPUT_INTERPOLATION[2] - translateY > 0).toEqual(
            true,
          );
        }
      });
    });

    it('should have the correct "animated-style" when starts to finish the animation', async () => {
      const componente = render(renderAlertMessage('github'));
      act(() => {
        fireEvent.press(elements.showMessageButton(componente));
      });
      act(() => {
        jest.advanceTimersByTime(
          HIDE_DELAY + TIMING_SPRING_ANIMATION + TIMING_HIDE_ANIMATION,
        );
      });
      await waitFor(() => {
        const translateY =
          elements.messageWrapper(componente)?.props.animatedStyle.value
            .transform[0].translateY;
        const opacity =
          elements.messageWrapper(componente)?.props.animatedStyle.value
            .opacity;
        const isFading = 1 > opacity && opacity > 0;
        const isHiding = TRANSLATE_Y_OUTPUT_INTERPOLATION[0] < translateY + 5;
        expect(isFading && isHiding).toEqual(true);
      });
    });
  });
});
