import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';

import { ScrollWithAnimatedHeader } from './ScrollWithAnimatedHeader';
import { MockedNavigator } from '../../../../__mocks__';

const backgroundInterpolation = {
  input: [0, theme.metrics.getWidthFromDP('8')],
  output: ['#222222', '#222222'],
};
const titleInterpolation = {
  input: [
    0,
    theme.metrics.getWidthFromDP('14'),
    theme.metrics.getWidthFromDP('24'),
  ],
  output: [0, 0, 1],
};
const scrollFlatListToEnd = (y: number) => ({
  nativeEvent: {
    contentOffset: {
      x: 0,
      y,
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 885,
      width: 328,
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 469,
      width: 328,
    },
  },
});

const renderScrollWithAnimatedHeader = (goback = jest.fn()) => {
  const Component = () => (
    <ThemeProvider theme={theme}>
      <ScrollWithAnimatedHeader
        backgroundColorInterpolationInput={backgroundInterpolation.input}
        backgroundColorInterpolationOutput={backgroundInterpolation.output}
        titleOpacityInterpolationInput={titleInterpolation.input}
        titleOpacityInterpolationOutput={titleInterpolation.output}
        canBounce
        isScrollEnabled
        headerTitle="HEADER_TITLE">
        <View testID="children" />
      </ScrollWithAnimatedHeader>
    </ThemeProvider>
  );
  return <MockedNavigator component={Component} />;
};

describe('Components/Common/ScrollWithAnimatedHeader', () => {
  const elements = {
    scrollview: (api: RenderAPI) =>
      api.getByTestId('scrollview-with-animated-header'),
    headerTitle: (api: RenderAPI) => api.getByTestId('animated-header-title'),
    header: (api: RenderAPI) => api.getByTestId('animated-header'),
    arrowBack: (api: RenderAPI) =>
      api.getByTestId('header-icon-button-wrapper-arrow-back'),
  };

  describe('Header-title', () => {
    it(`should render the "header-title" correctly when the "scroll-offset-y" is ${titleInterpolation.input[0]}px`, () => {
      const component = render(renderScrollWithAnimatedHeader());
      fireEvent.scroll(
        elements.scrollview(component),
        scrollFlatListToEnd(titleInterpolation.input[0]),
      );
      expect(elements.headerTitle(component)).toHaveAnimatedStyle({
        color: theme.colors.text,
        bottom: -theme.metrics.xs,
        opacity: 0,
      });
    });

    it(`should render the "header-title" correctly when the "scroll-offset-y" is ${titleInterpolation.input[1]}px`, async () => {
      const component = render(renderScrollWithAnimatedHeader());
      fireEvent.scroll(
        elements.scrollview(component),
        scrollFlatListToEnd(titleInterpolation.input[1]),
      );
      await waitFor(() => {
        expect(elements.headerTitle(component)).toHaveAnimatedStyle({
          color: theme.colors.text,
          bottom: -theme.metrics.sm,
          opacity: 0,
        });
      });
    });

    it(`should render the "header-title" correctly when the "scroll-offset-y" is ${titleInterpolation.input[2]}px`, async () => {
      const component = render(renderScrollWithAnimatedHeader());
      fireEvent.scroll(
        elements.scrollview(component),
        scrollFlatListToEnd(titleInterpolation.input[2]),
      );
      await waitFor(() => {
        expect(elements.headerTitle(component)).toHaveAnimatedStyle({
          color: theme.colors.text,
          bottom: 0,
          opacity: 1,
        });
      });
    });
  });

  describe('Header-background', () => {
    it(`should render the "header-background" correctly when the "scroll-offset-y" is ${backgroundInterpolation.input[0]}px`, () => {
      const component = render(renderScrollWithAnimatedHeader());
      fireEvent.scroll(
        elements.scrollview(component),
        scrollFlatListToEnd(backgroundInterpolation.input[0]),
      );
      expect(elements.header(component)).toHaveAnimatedStyle({
        backgroundColor: 'rgba(34, 34, 34, 1)',
        shadowColor: 'rgba(0, 0, 0, 0)',
      });
    });

    it(`should render the "header-background" correctly when the "scroll-offset-y" is ${backgroundInterpolation.input[1]}px`, async () => {
      const component = render(renderScrollWithAnimatedHeader());
      fireEvent.scroll(
        elements.scrollview(component),
        scrollFlatListToEnd(backgroundInterpolation.input[1]),
      );
      await waitFor(() => {
        expect(elements.header(component)).toHaveAnimatedStyle({
          backgroundColor: 'rgba(34, 34, 34, 1)',
          shadowColor: 'rgba(0, 0, 0, 1)',
        });
      });
    });
  });
});
