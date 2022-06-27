import React from 'react';

import {TMDBImage} from '@components';
import {ImageType} from '@local-types';

import {useProgressiveImage} from './useProgressiveImage';
import * as Styles from './ProgressiveImage.styles';

type ProgressiveImageProps = {
  removeBackgroundColor?: boolean;
  imageType: ImageType;
  borderRadius?: number;
  height?: number;
  image: string;
};

export const ProgressiveImage = (props: ProgressiveImageProps) => {
  const progressiveImage = useProgressiveImage();
  return (
    <Styles.ForegroundLayer
      borderRadius={props.borderRadius || 0}
      removeBackgroundColor={props.removeBackgroundColor}
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
          style={{
            width: Styles.styles.container.width,
            height: props.height || Styles.styles.container.height,
            opacity: progressiveImage.thumbnailOpacity,
            borderRadius: Number(props.borderRadius || 0),
          }}
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
            width: Styles.styles.container.width,
            height: props.height || Styles.styles.container.height,
            opacity: progressiveImage.imageOpacity,
            borderRadius: Number(props.borderRadius || 0),
          },
        ]}
      />
    </Styles.ForegroundLayer>
  );
};
