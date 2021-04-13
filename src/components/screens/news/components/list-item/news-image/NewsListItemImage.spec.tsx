/* eslint-disable import/first */
import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import timeTravel, { setupTimeTravel } from '../../../../../../../__mocks__/timeTravel';
import NewsListItemImage, { ANIMATION_DURATION } from './NewsListItemImage';

const renderNewsListItemImage = (imageURL = 'image') => (
  <ThemeProvider theme={theme}>
    <NewsListItemImage image={imageURL} />
  </ThemeProvider>
);

describe('Testing <NewsListItemImage />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupTimeTravel();
  });

  afterEach(cleanup);

  it('should render the loading layout when is mounted', () => {
    const { getByTestId } = render(renderNewsListItemImage());

    expect(getByTestId('news-image')).not.toBeNull();

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image')).not.toBeNull();
  });

  it('should render only the image after the image be loaded', () => {
    const { queryByTestId, getByTestId } = render(renderNewsListItemImage());

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
    const { getByTestId } = render(renderNewsListItemImage());

    fireEvent(getByTestId('news-image'), 'onError');

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image-off')).not.toBeNull();
  });

  it('should render the error layout when the image URL is null', () => {
    const { getByTestId } = render(renderNewsListItemImage(null));

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image-off')).not.toBeNull();
  });
});
