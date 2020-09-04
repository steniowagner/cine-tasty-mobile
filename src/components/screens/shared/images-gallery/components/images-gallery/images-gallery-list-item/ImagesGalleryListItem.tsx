import React, { memo } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

import useImagesGalleryListItem from './useImagesGalleryListItem';

interface GalleryImageStyleProps {
  readonly isLandscape?: boolean;
  readonly isPortrait?: boolean;
}

const IMAGES_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_IMAGE_SIZE_CODE}`;

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const GalleryImage = styled(Image)<GalleryImageStyleProps>`
  width: 100%;
  height: ${({ isLandscape, isPortrait }) => {
    if (isLandscape) {
      return '40%';
    }

    if (isPortrait) {
      return '70%';
    }

    return '0%';
  }};
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
  isAllowedToRender: boolean;
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
      <Wrapper>
        <CustomActivityIndicator />
      </Wrapper>
    );
  }

  if (hasError) {
    return (
      <ImageOffWrapper>
        <ImageOffIcon
          name="image-off"
        />
      </ImageOffWrapper>
    );
  }

  if (isLandscape || isPortrait) {
    return (
      <Wrapper>
        <GalleryImage
          source={{
            uri: `${IMAGES_URI}${imageURL}`,
          }}
          isLandscape={isLandscape}
          isPortrait={isPortrait}
        />
      </Wrapper>
    );
  }

  return null;
};

export default memo(ImagesGalleryListItem, (): boolean => true);
