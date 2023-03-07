import React from 'react';

import {TMDBImageAnimated} from '@components';
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
  const progressiveImage = useProgressiveImage({
    imageHeight: props.height,
    imageBorderRadius: props.borderRadius,
  });

  return (
    <Styles.ForegroundLayer
      borderRadius={props.borderRadius || 0}
      removeBackgroundColor={props.removeBackgroundColor}
      testID="progressive-image-wrapper">
      {!progressiveImage.isImageLoaded && (
        <TMDBImageAnimated
          onLoad={progressiveImage.onLoadThumbnail}
          imageType={props.imageType}
          blurRadius={1}
          image={props.image}
          isThumbnail
          testID="progressive-thumbnail"
          style={[
            progressiveImage.baseStyle,
            progressiveImage.thumbnailAnimatedStyle,
          ]}
        />
      )}
      <TMDBImageAnimated
        onLoad={progressiveImage.onLoadImage}
        imageType={props.imageType}
        image={props.image}
        testID="progressive-image"
        style={[
          progressiveImage.defaultImageBaseStyle,
          progressiveImage.defaultImageAnimatedStyle,
        ]}
      />
    </Styles.ForegroundLayer>
  );
};
