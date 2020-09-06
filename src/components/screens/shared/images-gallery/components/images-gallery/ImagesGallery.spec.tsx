/* eslint-disable import/first */
import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { dark } from 'styles/themes';

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
  <ThemeProvider theme={dark}>
    <MockedNavigation component={ImagesGallery} params={params} />
  </ThemeProvider>
);

describe('Testing <ImagesGallery />', () => {
  beforeEach(setupTimeTravel);

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

    expect(queryAllByTestId('images-gallery-list-item').length).toEqual(1);

    expect(queryAllByTestId('images-gallery-list-item-loading').length).toEqual(0);
  });

  it('should update the index-marker when the user swipe the list', () => {
    const { getByTestId, queryAllByTestId, queryByText } = render(renderImagesGallery());

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
});
