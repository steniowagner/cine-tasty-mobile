import React from 'react';
import { StyleSheet } from 'react-native';

import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { ImageType } from '@local-types';

import useProgressiveImage from './useProgressiveImage';
import * as Styles from './ProgressiveImage.styles';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});

type ProgressiveImageProps = {
  imageType: ImageType;
  borderRadius?: number;
  image: string;
};

const ProgressiveImage = ({
  borderRadius = 0,
  imageType,
  image,
}: ProgressiveImageProps) => {
  const {
    thumbnailOpacity,
    onLoadThumbnail,
    isImageLoaded,
    imageOpacity,
    onLoadImage,
  } = useProgressiveImage();

  return (
    <Styles.ForegroundLayer
      borderRadius={borderRadius}
    >
      {!isImageLoaded && (
        <TMDBImage
          onLoad={onLoadThumbnail}
          imageType={imageType}
          blurRadius={1}
          image={image}
          isThumbnail
          isAnimated
          style={[
            styles.container,
            {
              opacity: thumbnailOpacity,
              borderRadius: Number(borderRadius),
            },
          ]}
        />
      )}
      <TMDBImage
        onLoad={onLoadImage}
        imageType={imageType}
        image={image}
        isAnimated
        style={[
          styles.imageOverlay,
          {
            opacity: imageOpacity,
            borderRadius: Number(borderRadius),
          },
          styles.container,
        ]}
      />
    </Styles.ForegroundLayer>
  );
};

export default ProgressiveImage;
