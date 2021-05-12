import React from 'react';
import { Animated, StyleProp, ImageStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

import * as Types from '@local-types';

import useTMDBImage from './useTMDBImage';

type Style = StyleProp<ImageStyle> | { opacity: Animated.Value };

type TMDBImageProps = {
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

const TMDBImage = (props: TMDBImageProps) => {
  const tmdbImage = useTMDBImage({
    isThumbnail: props.isThumbnail || false,
    imageType: props.imageType,
    image: props.image,
  });

  if (props.isAnimated) {
    return (
      <Animated.Image
        blurRadius={props.blurRadius || 0}
        onError={props.onError}
        onLoad={props.onLoad}
        testID={props.testID}
        source={{
          uri: tmdbImage.uri,
        }}
        style={props.style}
        resizeMode="cover"
      />
    );
  }

  return (
    <FastImage
      // @ts-ignore
      style={props.style as StyleProp<ImageStyle> | StyleProp<ImageStyle>[]}
      source={{
        uri: tmdbImage.uri,
      }}
      resizeMode={FastImage.resizeMode.cover}
      onError={props.onError}
      onLoad={props.onLoad}
      testID={props.testID}
    />
  );
};

export default TMDBImage;
