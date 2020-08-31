import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';

import useProgressiveImage from './useProgressiveImage';

const ForegroundLayer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: 'rgba(242, 242, 242, 0.5)';
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
  thumbnailURL: string;
  imageURL: string;
};

const ProgressiveImage = ({ thumbnailURL, imageURL }: Props) => {
  const {
    thumbnailOpacity,
    onLoadThumbnail,
    isImageLoaded,
    imageOpacity,
    onLoadImage,
  } = useProgressiveImage();

  return (
    <ForegroundLayer>
      {!isImageLoaded && (
        <Animated.Image
          style={[
            styles.container,
            {
              opacity: thumbnailOpacity,
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
