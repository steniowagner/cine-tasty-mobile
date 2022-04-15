import React from 'react';
import {render, RenderAPI, waitFor} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {light} from '@styles/themes/light';
import {dark} from '@styles/themes/dark';

import {BackgroundImage} from './BackgroundImage';

const renderBackgroundImage = (isLoading: boolean, theme = dark) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <BackgroundImage
        imageURL="IMAGE_URL"
        isLoading={isLoading}
        theme={theme}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<ProfileImage />', () => {
  const elements = {
    image: (api: RenderAPI) => api.queryByTestId('progressive-image-wrapper'),
    wrapper: (api: RenderAPI) => api.queryByTestId('background-image-wrapper'),
    loading: (api: RenderAPI) => api.queryByTestId('background-image-loading'),
  };

  describe('When the Theme is "dark"', () => {
    describe('Renders correctly', () => {
      it('should render correctly when "isLoading" is "false"', async () => {
        const component = render(renderBackgroundImage(false));
        expect(elements.image(component)).not.toBeNull();
        expect(elements.loading(component)).toBeNull();
        await waitFor(() => {});
      });
    });

    describe('Loading State', () => {
      it('should render the "loading-state" correctly when "isLoading" is "true"', async () => {
        const component = render(renderBackgroundImage(true));
        expect(elements.loading(component)).not.toBeNull();
        expect(elements.image(component)).toBeNull();
        await waitFor(() => {});
      });
    });
  });

  describe('When the Theme is "light"', () => {
    describe('Renders correctly', () => {
      it('should render correctly when "isLoading" is "false"', async () => {
        const component = render(renderBackgroundImage(false, light));
        expect(elements.image(component)).not.toBeNull();
        expect(elements.loading(component)).toBeNull();
        await waitFor(() => {});
      });
    });

    describe('Loading State', () => {
      it('should render the "loading-state" correctly when "isLoading" is "true"', async () => {
        const component = render(renderBackgroundImage(true, light));
        expect(elements.loading(component)).not.toBeNull();
        expect(elements.image(component)).toBeNull();
        await waitFor(() => {});
      });
    });
  });
});
