import React from 'react';
import { Animated, StyleProp, ImageStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

import * as Types from '@local-types';

import useTMDBImage from './useTMDBImage';

type Style = StyleProp<ImageStyle> | { opacity: Animated.Value };

type Props = {
  style: Style | Style[];
  imageType: Types.ImageType;
  isThumbnail?: boolean;
  isAnimated?: boolean;
  onError?: () => void;
  onLoad?: () => void;
  blurRadius?: number;
  testID?: string;
  image: string;
};

const TMDBImage = ({
  isThumbnail = false,
  isAnimated = false,
  blurRadius = 0,
  imageType,
  onError,
  testID,
  onLoad,
  style,
  image,
}: Props) => {
  const { uri } = useTMDBImage({ isThumbnail, imageType, image });

  if (isAnimated) {
    return (
      <Animated.Image
        blurRadius={blurRadius}
        resizeMode="cover"
        onError={onError}
        onLoad={onLoad}
        testID={testID}
        style={style}
        source={{
          uri,
        }}
      />
    );
  }

  return (
    <FastImage
      // @ts-ignore
      style={style as StyleProp<ImageStyle> | StyleProp<ImageStyle>[]}
      source={{
        uri,
      }}
      resizeMode={FastImage.resizeMode.cover}
      onError={onError}
      onLoad={onLoad}
      testID={testID}
    />
  );
};

export default TMDBImage;
