import React from 'react';
import { Animated } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';

import useTMDBImage from '@components/common/tmdb-image/useTMDBImage';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { useImagePinch } from '@hooks';
import metrics from '@styles/metrics';

import useImagesGalleryListItem from './useImagesGalleryListItem';
import * as Styles from './ImagesGalleryListItem.styles';

type ImagesGalleryListItemComponentProps = {
  imageURL: string;
};

const ImagesGalleryListItemComponent = ({
  imageURL,
}: ImagesGalleryListItemComponentProps) => {
  const { uri } = useTMDBImage({
    imageType: 'backdrop',
    isThumbnail: false,
    image: imageURL,
  });

  const {
    isLandscape, isPortrait, isLoading, hasError,
  } = useImagesGalleryListItem({
    imageURL: uri,
  });

  const { onPinchStateChange, onPinchEvent, pinchScale } = useImagePinch();

  if (isLoading) {
    return (
      <Styles.Wrapper
        testID="images-gallery-list-item-loading"
      >
        <Styles.CustomActivityIndicator />
      </Styles.Wrapper>
    );
  }

  if (hasError) {
    return (
      <Styles.ImageOffWrapper
        testID="image-error-wrapper"
      >
        <SVGIcon
          size={metrics.getWidthFromDP('25%')}
          colorThemeRef="white"
          id="image-off"
        />
      </Styles.ImageOffWrapper>
    );
  }

  if (isLandscape || isPortrait) {
    let height = '0%';

    if (isLandscape) {
      height = '50%';
    }

    if (isPortrait) {
      height = '65%';
    }

    return (
      <Styles.Wrapper
        testID="images-gallery-list-item"
      >
        <PinchGestureHandler
          onHandlerStateChange={onPinchStateChange}
          onGestureEvent={onPinchEvent}
        >
          <Animated.View
            style={[
              { width: '100%', height },
              {
                transform: [{ scale: pinchScale }],
              },
            ]}
          >
            <TMDBImage
              image={imageURL}
              style={{ width: '100%', height: '100%' }}
              imageType="backdrop"
            />
          </Animated.View>
        </PinchGestureHandler>
      </Styles.Wrapper>
    );
  }

  return null;
};

export default ImagesGalleryListItemComponent;
