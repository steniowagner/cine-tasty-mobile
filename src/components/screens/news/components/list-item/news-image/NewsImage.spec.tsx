/* eslint-disable import/first */
import React from 'react';
import {fireEvent, cleanup, render, act} from '@testing-library/react-native';

import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {ThemeContextProvider} from '@providers';

import NewsImage, {ANIMATION_DURATION} from './NewsImage';

const renderNewsImage = (imageURL = 'image') => (
  <ThemeContextProvider>
    <NewsImage image={imageURL} />
  </ThemeContextProvider>
);

describe('Testing <NewsImage />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupTimeTravel();
  });

  afterEach(cleanup);

  it('should render the loading layout when is mounted', () => {
    const {getByTestId} = render(renderNewsImage());

    expect(getByTestId('news-image')).not.toBeNull();

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image')).not.toBeNull();
  });

  it('should render only the image after the image be loaded', () => {
    const {queryByTestId, getByTestId} = render(renderNewsImage());

    act(() => {
      jest.runAllTimers();
    });

    fireEvent(getByTestId('news-image'), 'onLoad');

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(getByTestId('news-image')).not.toBeNull();

    expect(queryByTestId('fallback-image-wrapper')).toBeNull();

    expect(queryByTestId('icon-image')).toBeNull();
  });

  it("should render the error layout when there's some error when try to load the image", () => {
    const {getByTestId} = render(renderNewsImage());

    fireEvent(getByTestId('news-image'), 'onError');

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image-off')).not.toBeNull();
  });

  it('should render the error layout when the image URL is null', () => {
    const {getByTestId} = render(renderNewsImage(null));

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image-off')).not.toBeNull();
  });
});
