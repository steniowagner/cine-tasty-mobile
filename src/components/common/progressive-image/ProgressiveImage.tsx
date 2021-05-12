import React from 'react';

import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { ImageType } from '@local-types';

import useProgressiveImage from './useProgressiveImage';
import * as Styles from './ProgressiveImage.styles';

type ProgressiveImageProps = {
  imageType: ImageType;
  borderRadius?: number;
  image: string;
};

const ProgressiveImage = (props: ProgressiveImageProps) => {
  const progressiveImage = useProgressiveImage();

  return (
    <Styles.ForegroundLayer
      borderRadius={props.borderRadius || 0}
    >
      {!progressiveImage.isImageLoaded && (
        <TMDBImage
          onLoad={progressiveImage.onLoadThumbnail}
          imageType={props.imageType}
          image={props.image}
          blurRadius={1}
          isThumbnail
          isAnimated
          style={[
            Styles.TMDBStyle.container,
            {
              borderRadius: props.borderRadius || 0,
              opacity: progressiveImage.thumbnailOpacity,
            },
          ]}
        />
      )}
      <TMDBImage
        onLoad={progressiveImage.onLoadImage}
        imageType={props.imageType}
        image={props.image}
        isAnimated
        style={[
          Styles.TMDBStyle.imageOverlay,
          {
            borderRadius: props.borderRadius || 0,
            opacity: progressiveImage.imageOpacity,
          },
          Styles.TMDBStyle.container,
        ]}
      />
    </Styles.ForegroundLayer>
  );
};

export default ProgressiveImage;
