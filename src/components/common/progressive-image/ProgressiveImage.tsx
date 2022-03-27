import React from 'react';

import {TMDBImage} from '@components';
import {ImageType} from '@local-types';

import {useProgressiveImage} from './useProgressiveImage';
import * as Styles from './ProgressiveImage.styles';

type ProgressiveImageProps = {
  imageType: ImageType;
  borderRadius?: number;
  image: string;
};

export const ProgressiveImage = (props: ProgressiveImageProps) => {
  const progressiveImage = useProgressiveImage();
  return (
    <Styles.ForegroundLayer
      borderRadius={props.borderRadius || 0}
      testID="progressive-image-wrapper">
      {!progressiveImage.isImageLoaded && (
        <TMDBImage
          onLoad={progressiveImage.onLoadThumbnail}
          imageType={props.imageType}
          blurRadius={1}
          image={props.image}
          isThumbnail
          isAnimated
          testID="progressive-thumbnail"
          style={[
            Styles.styles.container,
            {
              opacity: progressiveImage.thumbnailOpacity,
              borderRadius: Number(props.borderRadius),
            },
          ]}
        />
      )}
      <TMDBImage
        onLoad={progressiveImage.onLoadImage}
        imageType={props.imageType}
        image={props.image}
        isAnimated
        testID="progressive-image"
        style={[
          Styles.styles.imageOverlay,
          {
            opacity: progressiveImage.imageOpacity,
            borderRadius: Number(props.borderRadius),
          },
          Styles.styles.container,
        ]}
      />
    </Styles.ForegroundLayer>
  );
};
