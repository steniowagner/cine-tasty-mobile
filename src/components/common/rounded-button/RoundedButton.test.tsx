import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes';

import { RoundedButton } from './RoundedButton';

const DEFAULT_BUTTON_TEXT = 'DEFAULT_BUTTON_TEXT';

const renderRoundedButton = (isDisabled = false, onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <RoundedButton
      isDisabled={isDisabled}
      onPress={onPress}
      text={DEFAULT_BUTTON_TEXT}
    />
  </ThemeProvider>
);

describe('Common-components/RoundedButton', () => {
  const elements = {
    button: (api: RenderAPI) => api.getByTestId('rounded-button'),
    text: (api: RenderAPI) => api.getByTestId('rounded-button-text'),
  };

  describe('Rendering', () => {
    it('should render correctly', () => {
      const component = render(renderRoundedButton());
      expect(elements.button(component)).not.toBeNull();
      expect(elements.text(component)).not.toBeNull();
    });

    it('should render with the "correct opacity" when it\'s "disabled"', () => {
      const component = render(renderRoundedButton(true));
      expect(elements.button(component).props.style.opacity).toEqual(0.5);
    });

    it('should render with the "correct opacity" when it\'s "enabled"', () => {
      const component = render(renderRoundedButton());
      expect(elements.button(component).props.style.opacity).toEqual(1);
    });

    it('should render the text correctly', () => {
      const component = render(renderRoundedButton());
      expect(elements.text(component).children[0]).toEqual(DEFAULT_BUTTON_TEXT);
    });
  });

  describe('Pressing', () => {
    it('should call "onPress" when "pressing the button" and it\'s enabled', () => {
      const onPress = jest.fn();
      const component = render(renderRoundedButton(false, onPress));
      expect(onPress).toBeCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onPress).toBeCalledTimes(1);
    });

    it('should not call "onPress" when "pressing the button" and it\'s disabled', () => {
      const onPress = jest.fn();
      const component = render(renderRoundedButton(true, onPress));
      expect(onPress).toBeCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onPress).toBeCalledTimes(0);
    });
  });
});
