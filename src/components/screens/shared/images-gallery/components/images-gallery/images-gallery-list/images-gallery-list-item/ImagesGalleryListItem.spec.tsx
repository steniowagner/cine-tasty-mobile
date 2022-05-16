/* eslint-disable import/first */
import React from 'react';
import { Image } from 'react-native';
import { cleanup, render } from '@testing-library/react-native';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { ThemeContextProvider } from '@providers';

import ImagesGalleryListItem from './ImagesGalleryListItem';

const IMAGE_URL = 'SOME_IMAGE_URL';

const renderImagesGalleryListItem = () => (
  <TMDBImageQualityProvider>
    <ThemeContextProvider>
      <ImagesGalleryListItem imageURL={IMAGE_URL} />
    </ThemeContextProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <ImagesGalleryListItem />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render correctly when the app fetches the image size successfully', () => {
    const getSizeMock = jest.spyOn(Image, 'getSize');

    getSizeMock.mockImplementation(
      (imageURL: string, onSuccess: (width: number, height: number) => void) => {
        onSuccess(100, 100);
      },
    );

    const { getByTestId, queryByTestId } = render(renderImagesGalleryListItem());

    expect(getByTestId('images-gallery-list-item')).not.toBeNull();

    expect(queryByTestId('image-error-wrapper')).toBeNull();

    expect(queryByTestId('images-gallery-list-item-loading')).toBeNull();

    expect(getSizeMock).toHaveBeenCalledTimes(1);

    expect(getSizeMock.mock.calls[0][0]).toEqual(
      `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
    );
  });

  it('should render correctly when the app is fetching the image size', () => {
    const getSizeMock = jest.spyOn(Image, 'getSize');

    getSizeMock.mockImplementation(
      (imageURL: string, onSuccess: (width: number, height: number) => void) => {
        setTimeout(() => {
          onSuccess(100, 100);
        }, 0);
      },
    );

    const { getByTestId, queryByTestId } = render(renderImagesGalleryListItem());

    expect(getByTestId('images-gallery-list-item-loading')).not.toBeNull();

    expect(queryByTestId('image-error-wrapper')).toBeNull();

    expect(queryByTestId('images-gallery-list-item')).toBeNull();

    expect(getSizeMock).toHaveBeenCalledTimes(1);

    expect(getSizeMock.mock.calls[0][0]).toEqual(
      `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
    );
  });

  it('should render correctly when the app receive and error when try to fetch image size', () => {
    const getSizeMock = jest.spyOn(Image, 'getSize');

    getSizeMock.mockImplementation(
      (imageURL: string, onSuccess: Function, onError: Function) => {
        onError();
      },
    );

    const { getByTestId, queryByTestId } = render(renderImagesGalleryListItem());

    expect(getByTestId('image-error-wrapper')).not.toBeNull();

    expect(queryByTestId('images-gallery-list-item-loading')).toBeNull();

    expect(queryByTestId('images-gallery-list-item')).toBeNull();

    expect(getSizeMock).toHaveBeenCalledTimes(1);

    expect(getSizeMock.mock.calls[0][0]).toEqual(
      `https://image.tmdb.org/t/p/undefined${IMAGE_URL}`,
    );
  });
});