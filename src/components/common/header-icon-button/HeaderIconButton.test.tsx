import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';

import { HeaderIconButton, HeaderIconButtonProps } from './HeaderIconButton';
import metrics from '@/styles/metrics';

const iconName = 'tune';

const renderHeaderButton = (params: HeaderIconButtonProps) => (
  <ThemeProvider theme={theme}>
    <HeaderIconButton {...params} />
  </ThemeProvider>
);

describe('Components/Common/HeaderIconButton', () => {
  const elements = {
    icon: (api: RenderAPI) => api.getByTestId(`icon-${iconName}`),
    iconButton: (api: RenderAPI) =>
      api.getByTestId(`header-icon-button-wrapper-${iconName}`),
  };

  describe('Rendering', () => {
    it('should render correctly when the button is disabled', () => {
      const component = render(
        renderHeaderButton({ iconName, onPress: jest.fn() }),
      );
      expect(elements.iconButton(component)).not.toBeNull();
      expect(elements.icon(component)).not.toBeNull();
    });

    it('should render correctly when the button is enabled', () => {
      const component = render(
        renderHeaderButton({
          iconName,
          onPress: jest.fn(),
          disabled: false,
        }),
      );
      expect(elements.iconButton(component)).not.toBeNull();
      expect(elements.icon(component)).not.toBeNull();
    });
  });

  describe('Pressing', () => {
    it('should call the "onPress" correctly when presses the "icon-button"', () => {
      const onPress = jest.fn();
      const component = render(
        renderHeaderButton({
          iconName,
          onPress,
        }),
      );
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.iconButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should not call the "onPress" function when the user presses "icon-button" and the button is "disabled"', () => {
      const onPress = jest.fn();
      const component = render(
        renderHeaderButton({
          iconName,
          onPress,
          disabled: true,
        }),
      );
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.iconButton(component));
      expect(onPress).toHaveBeenCalledTimes(0);
    });
  });

  describe('Style', () => {
    describe('Opacity', () => {
      it('should render with the correct "opacity" when "disabled" is not defined', () => {
        const component = render(
          renderHeaderButton({
            iconName,
            onPress: jest.fn(),
          }),
        );
        expect(elements.iconButton(component).props.style.opacity).toEqual(1);
      });

      it('should render with the correct "opacity" when "disabled" is defined', () => {
        const component = render(
          renderHeaderButton({
            iconName,
            onPress: jest.fn(),
            disabled: true,
          }),
        );
        expect(elements.iconButton(component).props.style.opacity).toEqual(0.5);
      });
    });

    describe('Margin', () => {
      it('should render with the correct "margin" when "withMarginRight" and "withMarginLeft" are not defined', () => {
        const component = render(
          renderHeaderButton({
            iconName,
            onPress: jest.fn(),
          }),
        );
        expect(elements.iconButton(component).props.style.marginRight).toEqual(
          0,
        );
        expect(elements.iconButton(component).props.style.marginLeft).toEqual(
          0,
        );
      });
      it('should render with the correct "margin-right" when "withMarginRight" is "true"', () => {
        const component = render(
          renderHeaderButton({
            withMarginRight: true,
            iconName,
            onPress: jest.fn(),
          }),
        );
        expect(elements.iconButton(component).props.style.marginRight).toEqual(
          metrics.md,
        );
      });

      it('should render with the correct "margin-left" when "withMarginLeft" is "true"', () => {
        const component = render(
          renderHeaderButton({
            withMarginLeft: true,
            iconName,
            onPress: jest.fn(),
          }),
        );
        expect(elements.iconButton(component).props.style.marginLeft).toEqual(
          metrics.md,
        );
      });
    });
  });
});
