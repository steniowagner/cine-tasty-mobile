import React from 'react';
import {
  Animated, Image, StyleProp, ImageStyle, ImageResizeMode,
} from 'react-native';

import { ImagesTypes } from 'types';

import useTMDBImage from './useTMDBImage';

type Props = {
  style: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  imageType: ImagesTypes;
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
};

export default TMDBImage;
