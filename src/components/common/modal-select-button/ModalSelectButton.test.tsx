import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';

import {randomPositiveNumber} from '@mocks/utils';
import {dark as theme} from '@styles/themes/dark';

import {ModalSelectButtonProps, ModalSelectButton} from './ModalSelectButton';

const TITLE = 'TITLE';

const renderModalSelectButton = (props: ModalSelectButtonProps) => (
  <ThemeProvider theme={theme}>
    <ModalSelectButton {...props} />
  </ThemeProvider>
);

describe('<ModalSelectButton />', () => {
  const elements = {
    selectButton: (api: RenderAPI) => api.queryByTestId('select-button'),
    selectButtonText: (api: RenderAPI) =>
      api.queryByTestId('select-button-text'),
  };

  describe('Render correctly', () => {
    it('should render correctly when "borderBottomRightRadius" is set', () => {
      const borderBottomRightRadius = randomPositiveNumber(10, 1);
      const component = render(
        renderModalSelectButton({
          borderBottomRightRadius,
          onPress: jest.fn(),
          isDisabled: false,
          title: TITLE,
        }),
      );
      expect(
        elements.selectButton(component).props.style.borderBottomRightRadius,
      ).toEqual(borderBottomRightRadius);
      expect(
        elements.selectButton(component).props.style.borderBottomLeftRadius,
      ).toEqual(0);
      expect(elements.selectButtonText(component).children[0]).toEqual(TITLE);
    });

    it('should render correctly when "borderBottomLeftRadius" is set', () => {
      const borderBottomLeftRadius = randomPositiveNumber(10, 1);
      const component = render(
        renderModalSelectButton({
          borderBottomLeftRadius,
          onPress: jest.fn(),
          isDisabled: false,
          title: TITLE,
        }),
      );
      expect(
        elements.selectButton(component).props.style.borderBottomLeftRadius,
      ).toEqual(borderBottomLeftRadius);
      expect(
        elements.selectButton(component).props.style.borderBottomRightRadius,
      ).toEqual(0);
      expect(elements.selectButtonText(component).children[0]).toEqual(TITLE);
    });

    it('should render correctly when "borderBottomLeftRadius" and "borderBottomLeftRadius" are set', () => {
      const borderBottomLeftRadius = randomPositiveNumber(10, 1);
      const borderBottomRightRadius = randomPositiveNumber(10, 1);
      const component = render(
        renderModalSelectButton({
          borderBottomLeftRadius,
          borderBottomRightRadius,
          onPress: jest.fn(),
          isDisabled: false,
          title: TITLE,
        }),
      );
      expect(
        elements.selectButton(component).props.style.borderBottomLeftRadius,
      ).toEqual(borderBottomLeftRadius);
      expect(
        elements.selectButton(component).props.style.borderBottomRightRadius,
      ).toEqual(borderBottomRightRadius);
      expect(elements.selectButtonText(component).children[0]).toEqual(TITLE);
    });
  });

  describe('Press button', () => {
    it('should not call the "onPress" when user press and "isDisabled" is "false"', () => {
      const onPress = jest.fn();
      const component = render(
        renderModalSelectButton({onPress, isDisabled: false, title: TITLE}),
      );
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.selectButton(component));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should call the "onPress" when user press and "isDisabled" is "true"', () => {
      const onPress = jest.fn();
      const component = render(
        renderModalSelectButton({onPress, isDisabled: true, title: 'TITLE'}),
      );
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.selectButton(component));
      expect(onPress).toHaveBeenCalledTimes(0);
    });
  });
});
