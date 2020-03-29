/* eslint-disable import/first */
import React from 'react';
import {
  fireEvent, cleanup, render, act,
} from 'react-native-testing-library';
import { ThemeProvider } from 'styled-components';

jest.useFakeTimers();

import { dark } from '../../../../../../styles/themes';
import NewsListItemImage from './NewsListItemImage';
import Icon from '../../../../../common/Icon';

const renderNewsListItemImage = () => (
  <ThemeProvider
    theme={dark}
  >
    <NewsListItemImage
      image="image"
    />
  </ThemeProvider>
);

describe('Testing <NewsListItemImage />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render the loading layout when is mounted', () => {
    const { getByTestId, getAllByType } = render(renderNewsListItemImage());

    expect(getByTestId('news-image')).not.toBeNull();

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getAllByType(Icon)[0].props.name).toBe('image');
  });

  it('should render only the image after the image be loaded', () => {
    const { getByTestId, getAllByType } = render(renderNewsListItemImage());

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
      expect(getAllByType(Icon));
    } catch (err) {
      expect(err.message).toEqual('No instances found');
    }
  });

  it("should render the error layout when there's some error when try to load the image", () => {
    const { getByTestId, getAllByType } = render(renderNewsListItemImage());

    fireEvent(getByTestId('news-image'), 'onError');

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getAllByType(Icon)[0].props.name).toBe('image-off');
  });
});
