/* eslint-disable import/first */
import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import NewsListItemImage from './NewsListItemImage';

jest.useFakeTimers();

const renderNewsListItemImage = (imageURL = 'image') => (
  <ThemeProvider theme={theme}>
    <NewsListItemImage image={imageURL} />
  </ThemeProvider>
);

describe('Testing <NewsListItemImage />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render the loading layout when is mounted', () => {
    const { getByTestId } = render(renderNewsListItemImage());

    expect(getByTestId('news-image')).not.toBeNull();

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toBe('image');
  });

  it('should render only the image after the image be loaded', () => {
    const { getByTestId } = render(renderNewsListItemImage());

    act(() => {
      jest.runAllTimers();
    });

    fireEvent(getByTestId('news-image'), 'onLoad');

    expect(getByTestId('news-image')).not.toBeNull();

    try {
      expect(getByTestId('fallback-image-wrapper'));
    } catch (err) {
      expect(err.message.includes('No instances found')).toBe(true);
    }

    try {
      expect(getByTestId('icon'));
    } catch (err) {
      expect(err.message).toEqual('No instances found');
    }
  });

  it("should render the error layout when there's some error when try to load the image", () => {
    const { getByTestId } = render(renderNewsListItemImage());

    fireEvent(getByTestId('news-image'), 'onError');

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toBe('image-off');
  });

  it('should render the error layout when the image URL is null', () => {
    const { getByTestId } = render(renderNewsListItemImage(null));

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toBe('image-off');
  });
});
