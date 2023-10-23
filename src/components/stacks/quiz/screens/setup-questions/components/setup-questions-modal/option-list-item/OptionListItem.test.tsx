import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';

import OptionListItem from './OptionListItem';

const DEFAULT_TITLE = 'DEFAULT_TITLE';

const renderOptionListItem = (isSelected = false, onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <OptionListItem
      title={DEFAULT_TITLE}
      isSelected={isSelected}
      onPress={onPress}
    />
  </ThemeProvider>
);

describe('Screens/Quiz/SetupQuestions/OptionListItem', () => {
  const elements = {
    button: (api: RenderAPI) => api.getByTestId('option-list-item-button'),
    text: (api: RenderAPI) => api.getByTestId('option-list-item-text'),
    icon: (api: RenderAPI) => api.queryByTestId('icon-checkbox-circle'),
  };

  describe('Rendering', () => {
    it('should render the "title" correctly', () => {
      const component = render(renderOptionListItem());
      expect(elements.text(component).children[0]).toEqual(DEFAULT_TITLE);
    });

    describe('When "isSelected" is "true"', () => {
      const isSelected = true;
      it('should render corretly', () => {
        const component = render(renderOptionListItem(isSelected));
        expect(elements.button(component)).not.toBeNull();
        expect(elements.text(component)).not.toBeNull();
        expect(elements.icon(component)).not.toBeNull();
      });

      it('should render the "ListItemWrapper" with the "correct background-color"', () => {
        const component = render(renderOptionListItem(isSelected));
        expect(elements.button(component).props.style.backgroundColor).toEqual(
          theme.colors.background,
        );
      });

      it('should render the "ListItemText" with the "correct color"', () => {
        const component = render(renderOptionListItem(isSelected));
        const { style } = elements.text(component).props;
        const { color } = style[style.length - 1];
        expect(color).toEqual(theme.colors.text);
      });
    });

    describe('When "isSelected" is "false"', () => {
      const isSelected = false;
      it('should render corretly', () => {
        const component = render(renderOptionListItem(isSelected));
        expect(elements.button(component)).not.toBeNull();
        expect(elements.text(component)).not.toBeNull();
        expect(elements.icon(component)).toBeNull();
      });

      it('should render the "ListItemWrapper" with the "correct background-color"', () => {
        const component = render(renderOptionListItem(isSelected));
        expect(elements.button(component).props.style.backgroundColor).toEqual(
          theme.colors.white,
        );
      });

      it('should render the "ListItemText" with the "correct color"', () => {
        const component = render(renderOptionListItem(isSelected));
        const { style } = elements.text(component).props;
        const { color } = style[style.length - 1];
        expect(color).toEqual(theme.colors.buttonText);
      });
    });
  });

  describe('Pressing', () => {
    it('should call "onPress" when pressed', () => {
      const onPress = jest.fn();
      const component = render(renderOptionListItem(true, onPress));
      expect(onPress).toBeCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onPress).toBeCalledTimes(1);
    });
  });
});
