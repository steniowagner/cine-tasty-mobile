import React from 'react';
import {Platform} from 'react-native';
import {RenderAPI, render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes';
import metrics from '@styles/metrics';

import {HeaderBackButton} from './HeaderBackButton';

const renderHeaderBackButton = (onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <HeaderBackButton onPress={onPress} />
  </ThemeProvider>
);

describe('<HeaderBackButton />', () => {
  const elements = {
    buttonWrapper: (api: RenderAPI) => api.queryByTestId('header-back-button'),
    arrowBackIcon: (api: RenderAPI) => api.queryByTestId('icon-arrow-back'),
    chevronLeftIcon: (api: RenderAPI) => api.queryByTestId('icon-chevron-left'),
  };

  describe('Android', () => {
    beforeAll(() => {
      jest.spyOn(Platform, 'select').mockImplementation(({android}) => android);
    });

    describe('Press', () => {
      it('should call "onPress" when the user press', () => {
        const onPress = jest.fn();
        const component = render(renderHeaderBackButton(onPress));
        expect(onPress).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.buttonWrapper(component));
        expect(onPress).toHaveBeenCalledTimes(1);
      });
    });

    describe('Render', () => {
      it('should render the correct Icon', () => {
        const component = render(renderHeaderBackButton());
        expect(elements.arrowBackIcon(component)).not.toBeNull();
        expect(elements.chevronLeftIcon(component)).toBeNull();
      });

      it('should set the correct size for the Icon', () => {
        const component = render(renderHeaderBackButton());
        console.log(elements.arrowBackIcon(component).props.style);
        expect(elements.arrowBackIcon(component).props.style[2].width).toEqual(
          metrics.getWidthFromDP('6.5%'),
        );
        expect(elements.arrowBackIcon(component).props.style[2].height).toEqual(
          metrics.getWidthFromDP('6.5%'),
        );
      });
    });
  });

  describe('iOS', () => {
    beforeAll(() => {
      jest.spyOn(Platform, 'select').mockImplementation(({ios}) => ios);
    });

    describe('Press', () => {
      it('should call "onPress" when the user press', () => {
        const onPress = jest.fn();
        const component = render(renderHeaderBackButton(onPress));
        expect(onPress).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.buttonWrapper(component));
        expect(onPress).toHaveBeenCalledTimes(1);
      });
    });

    describe('Render', () => {
      it('should render the correct Icon', () => {
        const component = render(renderHeaderBackButton());
        expect(elements.arrowBackIcon(component)).toBeNull();
        expect(elements.chevronLeftIcon(component)).not.toBeNull();
      });

      it('should set the correct size for the Icon', () => {
        const component = render(renderHeaderBackButton());
        expect(
          elements.chevronLeftIcon(component).props.style[2].width,
        ).toEqual(metrics.getWidthFromDP('8.7%'));
        expect(
          elements.chevronLeftIcon(component).props.style[2].height,
        ).toEqual(metrics.getWidthFromDP('8.7%'));
      });
    });
  });
});
