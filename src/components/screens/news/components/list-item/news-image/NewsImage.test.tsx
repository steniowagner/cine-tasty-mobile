import React from 'react';
import {
  RenderAPI,
  fireEvent,
  cleanup,
  render,
  act,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';

import NewsImage, {ANIMATION_DURATION} from './NewsImage';

const renderNewsImage = (imageURL = 'image') => (
  <ThemeProvider theme={theme}>
    <NewsImage image={imageURL} />
  </ThemeProvider>
);

describe('<NewsImage />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupTimeTravel();
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

  it('should render only the image after the image be loaded', () => {
    const component = render(renderNewsImage());
    act(() => {
      jest.runAllTimers();
    });
    fireEvent(elements.newsImage(component), 'onLoad');
    act(() => {
      timeTravel(ANIMATION_DURATION);
    });
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
