import React from 'react';
import {
  Animated, Image, StyleProp, ImageStyle, ImageResizeMode,
} from 'react-native';

import { ImageType } from 'types';

import useTMDBImage from './useTMDBImage';

type Style = StyleProp<ImageStyle> | { opacity: Animated.Value };

type Props = {
  resizeMode?: ImageResizeMode;
  style: Style | Style[];
  imageType: ImageType;
  isThumbnail?: boolean;
  isAnimated?: boolean;
  onError?: () => void;
  onLoad?: () => void;
  blurRadius?: number;
  image: string;
};

const TMDBImage = ({
  isThumbnail = false,
  isAnimated = false,
  blurRadius = 0,
  resizeMode,
  imageType,
  onError,
  onLoad,
  style,
  image,
}: Props) => {
  const { uri } = useTMDBImage({ isThumbnail, imageType, image });

  if (isAnimated) {
    return (
      <Animated.Image
        blurRadius={blurRadius}
        resizeMode={resizeMode}
        onError={onError}
        onLoad={onLoad}
        style={style}
        source={{
          uri,
        }}
      />
    );
  }

  return (
    <Image
      style={style as StyleProp<ImageStyle> | StyleProp<ImageStyle>[]}
      blurRadius={blurRadius}
      resizeMode={resizeMode}
      onError={onError}
      onLoad={onLoad}
      source={{
        uri,
      }}
    />
  );
};

export default TMDBImage;
