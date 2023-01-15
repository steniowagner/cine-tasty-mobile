jest.unmock('react-native-reanimated');

import React from 'react';
import {
  RenderAPI,
  fireEvent,
  cleanup,
  render,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import {NewsImage} from './NewsImage';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const renderNewsImage = (imageURL = 'image') => (
  <ThemeProvider theme={theme}>
    <NewsImage image={imageURL} />
  </ThemeProvider>
);

describe('<NewsImage />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  const elements = {
    newsImage: (api: RenderAPI) => api.queryByTestId('news-image'),
    fallbackImageWrapper: (api: RenderAPI) =>
      api.queryByTestId('fallback-image-wrapper'),
    iconImage: (api: RenderAPI) => api.queryByTestId('icon-image'),
    iconImageOff: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
  };

  it('should render the loading layout when is mounted', () => {
    const component = render(renderNewsImage());
    expect(elements.newsImage(component)).not.toBeNull();
    expect(elements.fallbackImageWrapper(component)).not.toBeNull();
    expect(elements.iconImage(component)).not.toBeNull();
  });

  it('should render only the image after the image being loaded', () => {
    const component = render(renderNewsImage());
    fireEvent(elements.newsImage(component), 'onLoad');
    expect(elements.newsImage(component)).not.toBeNull();
    expect(elements.fallbackImageWrapper(component)).toBeNull();
    expect(elements.iconImage(component)).toBeNull();
  });

  it("should render the error layout when there's some error when try to load the image", () => {
    const component = render(renderNewsImage());
    fireEvent(elements.newsImage(component), 'onError');
    expect(elements.fallbackImageWrapper(component)).not.toBeNull();
    expect(elements.iconImageOff(component)).not.toBeNull();
  });

  it('should render the error layout when the image URL is null', () => {
    const component = render(renderNewsImage(null));
    expect(elements.fallbackImageWrapper(component)).not.toBeNull();
    expect(elements.iconImageOff(component)).not.toBeNull();
  });
});
