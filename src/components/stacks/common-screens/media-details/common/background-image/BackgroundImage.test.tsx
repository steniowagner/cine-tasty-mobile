import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { act } from 'react-test-renderer';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import { dark as theme } from '@styles/themes';

import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from './BackgroundImage.styles';
import { BackgroundImage } from './BackgroundImage';

const renderBackgroundImage = () => (
  <ThemeProvider theme={theme}>
    <BackgroundImage image="SOME_IMAGE" />
  </ThemeProvider>
);

describe('Common-screens/Media-Details/Common/Background-Image', () => {
  const elements = {
    animatedView: (api: RenderAPI) =>
      api.getByTestId('background-animated-view'),
    image: (api: RenderAPI) => api.getByTestId('background-image'),
    shadow: (api: RenderAPI) => api.getByTestId('smoke-shadow'),
  };

  describe('Rendering', () => {
    it('should render all elements by default', () => {
      const component = render(renderBackgroundImage());
      expect(elements.animatedView(component)).not.toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.shadow(component)).not.toBeNull();
    });
  });

  describe('Animating', () => {
    it('should reveal the "animated-view" when "loads" the "image"', async () => {
      const component = render(renderBackgroundImage());
      expect(elements.animatedView(component)).toHaveAnimatedStyle({
        opacity: 0,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        position: 'absolute',
      });
      act(() => {
        fireEvent(elements.image(component), 'onLoad');
      });
      await waitFor(() => {
        expect(elements.animatedView(component)).toHaveAnimatedStyle({
          opacity: 1,
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT,
          position: 'absolute',
        });
      });
    });
  });
});
