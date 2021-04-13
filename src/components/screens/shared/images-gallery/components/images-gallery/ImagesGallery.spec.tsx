/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import theme from '@styles/theme';

jest.mock('../../../../../../styles/metrics', () => ({
  getHeightFromDP: jest.fn(),
  getWidthFromDP: jest.fn(),
  navigationHeaderFontSize: 1,
  extraLargeSize: 1,
  extraSmallSize: 1,
  mediumSize: 1,
  smallSize: 1,
  largeSize: 1,
  width: 100,
  height: 1,
}));

import { setupTimeTravel } from '../../../../../../../__mocks__/timeTravel';
import MockedNavigation from '../../../../../../../__mocks__/MockedNavigator';
import ImagesGallery from './ImagesGallery';

const IMAGES = ['image01', 'image02', 'image03'];
const INDEX_INITIAL_IMAGE = 1;

const params = {
  indexSelected: INDEX_INITIAL_IMAGE,
  gallerySize: IMAGES.length,
  images: IMAGES,
};

const renderImagesGallery = () => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <MockedNavigation component={ImagesGallery} params={params} />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <ImagesGallery />', () => {
  beforeEach(() => {
    setupTimeTravel();
    jest.resetModules();
  });

  afterEach(cleanup);

  it('should render correctly on the first render', () => {
    const { getByTestId, queryAllByTestId, queryByText } = render(renderImagesGallery());

    expect(queryByText(`${INDEX_INITIAL_IMAGE + 1}/${IMAGES.length}`)).not.toBeNull();

    expect(getByTestId('images-list')).not.toBeNull();

    expect(getByTestId('images-list').props.data.length).toEqual(IMAGES.length);

    expect(queryAllByTestId('placeholder-list-item').length).toEqual(IMAGES.length - 1);

    expect(queryAllByTestId('images-gallery-list-item-loading').length).toEqual(1);

    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByTestId('placeholder-list-item').length).toEqual(IMAGES.length - 1);

    expect(queryAllByTestId('images-gallery-list-item').length).toEqual(0);

    expect(queryAllByTestId('images-gallery-list-item-loading').length).toEqual(0);
  });

  it('should update the index-marker when the user swipe the images-list', () => {
    const { getByTestId, queryByText } = render(renderImagesGallery());

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: 101,
        },
      },
    };

    expect(queryByText(`${INDEX_INITIAL_IMAGE + 1}/${IMAGES.length}`)).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    fireEvent(getByTestId('images-list'), 'onMomentumScrollEnd', eventData);

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByText(`${INDEX_INITIAL_IMAGE + 2}/${IMAGES.length}`)).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });

  it('should update the index-marker when the user swipe the thumb-list', () => {
    const { getAllByTestId, queryByText } = render(renderImagesGallery());

    const indexThumbSelected = (Math.random() * (IMAGES.length - 1 - 0 + 1)) << 0;

    expect(queryByText(`${INDEX_INITIAL_IMAGE + 1}/${IMAGES.length}`)).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    const thumbSelected = getAllByTestId('thumb-list-item')[indexThumbSelected];

    fireEvent.press(thumbSelected);

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByText(`${indexThumbSelected + 1}/${IMAGES.length}`)).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
  });
});
