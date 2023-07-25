jest.unmock('react-native-reanimated');
import React from 'react';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import metrics from '@styles/metrics';

import {ImageListItem} from './ImageListItem';

const renderImageListItem = (
  orientation: 'PORTRAIT' | 'LANDSCAPE',
  onPress = jest.fn(),
) => (
  <ThemeProvider theme={theme}>
    <ImageListItem
      orientation={orientation}
      onPress={onPress}
      image="SOME_IMAGE"
    />
  </ThemeProvider>
);

describe('<ImageListItem />', () => {
  const elements = {
    imageButtons: (api: RenderAPI) =>
      api.queryByTestId('image-list-item-button'),
  };

  describe('When "orientation" is "PORTRAIT"', () => {
    describe('UI', () => {
      it('should render correctly', () => {
        const component = render(renderImageListItem('PORTRAIT'));
        expect(elements.imageButtons(component)).not.toBeNull();
        expect(elements.imageButtons(component).props.style.width).toEqual(
          metrics.getWidthFromDP('35%'),
        );
        expect(elements.imageButtons(component).props.style.height).toEqual(
          metrics.getWidthFromDP('45%'),
        );
      });
    });

    describe('Pressing the image-button', () => {
      it('should call "onPress" when the item is pressed', () => {
        const onPress = jest.fn();
        const component = render(renderImageListItem('PORTRAIT', onPress));
        expect(onPress).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.imageButtons(component));
        expect(onPress).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('When "orientation" is "LANDSCAPE"', () => {
    describe('UI', () => {
      it('should render correctly', () => {
        const component = render(renderImageListItem('LANDSCAPE'));
        expect(elements.imageButtons(component)).not.toBeNull();
        expect(elements.imageButtons(component).props.style.width).toEqual(
          metrics.getWidthFromDP('60%'),
        );
        expect(elements.imageButtons(component).props.style.height).toEqual(
          metrics.getWidthFromDP('38%'),
        );
      });
    });

    describe('Pressing the image-button', () => {
      it('should call "onPress" when the item is pressed', () => {
        const onPress = jest.fn();
        const component = render(renderImageListItem('LANDSCAPE', onPress));
        expect(onPress).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.imageButtons(component));
        expect(onPress).toHaveBeenCalledTimes(1);
      });
    });
  });
});
