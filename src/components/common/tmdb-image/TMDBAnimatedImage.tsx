import React from 'react';
import {StyleProp, ImageStyle} from 'react-native';
import Animated from 'react-native-reanimated';

import {useTMDBImage} from './useTMDBImage';
import {TMDBAImageProps} from './TMDBImagesProps';

type TMDBAnimatedImageProps = TMDBAImageProps & {
  style: Animated.AnimateStyle<StyleProp<ImageStyle>>;
  blurRadius?: number;
};

export const TMDBAnimatedImage = (props: TMDBAnimatedImageProps) => {
  const tmdbImage = useTMDBImage({
    isThumbnail: props.isThumbnail,
    imageType: props.imageType,
    image: props.image,
  });

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
};
