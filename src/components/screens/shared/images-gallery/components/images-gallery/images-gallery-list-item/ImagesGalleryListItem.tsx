import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

import useImagesGalleryListItem from './useImagesGalleryListItem';

export const IMAGES_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_IMAGE_SIZE_CODE}`;

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CustomActivityIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
  size: 'large',
}))``;

const ImageOffWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  justify-content: center;
  align-items: center;
`;

const ImageOffIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('25%'),
  color: 'white',
}))``;

type Props = {
  imageURL: string;
};

const ImagesGalleryListItem = ({ imageURL }: Props) => {
  const {
    isLandscape, isPortrait, isLoading, hasError,
  } = useImagesGalleryListItem({
    imageURL: `${IMAGES_URI}${imageURL}`,
  });

  if (isLoading) {
    return (
      <Wrapper
        testID="images-gallery-list-item-loading"
      >
        <CustomActivityIndicator />
      </Wrapper>
    );
  }

  if (hasError) {
    return (
      <ImageOffWrapper
        testID="image-error-wrapper"
      >
        <ImageOffIcon
          name="image-off"
        />
      </ImageOffWrapper>
    );
  }

  if (isLandscape || isPortrait) {
    const height = (function () {
      if (isLandscape) {
        return '40%';
      }

      if (isPortrait) {
        return '70%';
      }

      return '0%';
    }());

    return (
      <Wrapper
        testID="images-gallery-list-item"
      >
        <TMDBImage
          imageType="backdrop"
          image={imageURL}
          style={{
            width: '100%',
            height,
          }}
        />
      </Wrapper>
    );
  }

  return null;
};

export default memo(ImagesGalleryListItem, (): boolean => true);
