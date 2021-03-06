import React, { memo } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import styled from 'styled-components';

import useTMDBImage from 'components/common/tmdb-image/useTMDBImage';
import SVGIcon from 'components/common/svg-icon/SVGIcon';
import CONSTANTS from 'utils/constants';
import { useImagePinch } from 'hooks';
import metrics from 'styles/metrics';

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

type Props = {
  imageURL: string;
};

const ImagesGalleryListItem = ({ imageURL }: Props) => {
  const {
    isLandscape, isPortrait, isLoading, hasError,
  } = useImagesGalleryListItem({
    imageURL: `${IMAGES_URI}${imageURL}`,
  });

  const { uri } = useTMDBImage({
    isThumbnail: false,
    imageType: 'backdrop',
    image: imageURL,
  });

  const { onPinchStateChange, onPinchEvent, pinchScale } = useImagePinch();

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
        <SVGIcon
          size={metrics.getWidthFromDP('25%')}
          colorThemeRef="white"
          id="image-off"
        />
      </ImageOffWrapper>
    );
  }

  if (isLandscape || isPortrait) {
    let height = '0%';

    if (isLandscape) {
      height = '40%';
    }

    if (isPortrait) {
      height = '70%';
    }

    return (
      <Wrapper
        testID="images-gallery-list-item"
      >
        <PinchGestureHandler
          onHandlerStateChange={onPinchStateChange}
          onGestureEvent={onPinchEvent}
        >
          <Animated.Image
            source={{ uri }}
            style={[
              { width: '100%', height },
              {
                transform: [{ scale: pinchScale }],
              },
            ]}
          />
        </PinchGestureHandler>
      </Wrapper>
    );
  }

  return null;
};

export default memo(ImagesGalleryListItem, (): boolean => true);
