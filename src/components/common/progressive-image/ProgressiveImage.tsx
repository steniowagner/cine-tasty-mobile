import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components';

import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { ImageType } from '@local-types';

import useProgressiveImage from './useProgressiveImage';

type ForegroundLayerStyleProps = {
  borderRadius?: number;
};

const ForegroundLayer = styled(View)<ForegroundLayerStyleProps>`
  height: 100%;
  width: 100%;
  background-color: 'rgba(242, 242, 242, 0.5)';
  border-radius: ${({ borderRadius }) => Number(borderRadius)}px;
`;

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

type Props = {
  imageType: ImageType;
  borderRadius?: number;
  image: string;
};

const ProgressiveImage = ({ borderRadius = 0, imageType, image }: Props) => {
  const {
    thumbnailOpacity,
    onLoadThumbnail,
    isImageLoaded,
    imageOpacity,
    onLoadImage,
  } = useProgressiveImage();

  return (
    <ForegroundLayer
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
    </ForegroundLayer>
  );
};

export default ProgressiveImage;
