import React from 'react';
import {Animated, StyleProp, ImageStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

import * as Types from '@local-types';

import {useTMDBImage} from './useTMDBImage';

type Style = StyleProp<ImageStyle> | {opacity: Animated.Value};

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

export const TMDBImage = (props: TMDBImageProps) => {
  const tmdbImage = useTMDBImage({
    isThumbnail: props.isThumbnail,
    imageType: props.imageType,
    image: props.image,
  });

  if (props.isAnimated) {
    return (
      <Animated.Image
        blurRadius={props.blurRadius || 0}
        resizeMode="cover"
        onError={props.onError}
        onLoad={props.onLoad}
        testID={props.testID}
        style={props.style}
        source={{
          uri: tmdbImage.uri,
        }}
      />
    );
  }

  return (
    <FastImage
      // @ts-ignore
      style={props.style as StyleProp<ImageStyle> | StyleProp<ImageStyle>[]}
      resizeMode={FastImage.resizeMode.cover}
      source={{
        uri: tmdbImage.uri,
      }}
      onError={props.onError}
      onLoad={props.onLoad}
      testID={props.testID}
    />
  );
};
