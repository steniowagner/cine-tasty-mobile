import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';

import useProgressiveImage from './useProgressiveImage';

interface ForegroundLayerStyleProps {
  readonly borderRadius?: number;
}

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
  borderRadius?: number;
  thumbnailURL: string;
  imageURL: string;
};

const ProgressiveImage = ({ borderRadius = 0, thumbnailURL, imageURL }: Props) => {
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
        <Animated.Image
          style={[
            styles.container,
            {
              opacity: thumbnailOpacity,
              borderRadius: Number(borderRadius),
            },
          ]}
          source={{ uri: thumbnailURL }}
          onLoad={onLoadThumbnail}
          blurRadius={1}
          resize="cover"
        />
      )}
      <Animated.Image
        style={[
          styles.imageOverlay,
          {
            opacity: imageOpacity,
            borderRadius: Number(borderRadius),
          },
          styles.container,
        ]}
        onLoad={onLoadImage}
        source={{ uri: imageURL }}
        resize="cover"
      />
    </ForegroundLayer>
  );
};

export default ProgressiveImage;
