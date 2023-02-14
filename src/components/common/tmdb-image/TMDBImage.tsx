import React from 'react';
import {StyleProp} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';

import * as Types from '@local-types';

import {useTMDBImage} from './useTMDBImage';

type TMDBImageProps = {
  style: StyleProp<ImageStyle>;
  imageType: Types.ImageType;
  isThumbnail?: boolean;
  onError?: () => void;
  onLoad?: () => void;
  testID?: string;
  image: string;
};

export const TMDBImage = (props: TMDBImageProps) => {
  const tmdbImage = useTMDBImage({
    isThumbnail: props.isThumbnail,
    imageType: props.imageType,
    image: props.image,
  });

  return (
    <FastImage
      style={props.style}
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
