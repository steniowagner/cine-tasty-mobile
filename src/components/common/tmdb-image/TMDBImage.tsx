import React from 'react';
import Animated from 'react-native-reanimated';
import FastImage, { ImageStyle } from 'react-native-fast-image';

import { ImageType } from '../../../providers/tmdb-image-qualities/types';
import { renderSVGIconConditionally } from '../../../utils';
import { useTMDBImage } from './use-tmdb-image';
import { Icons } from '..';

type TMDBImageProps = {
  iconImageLoading: Icons;
  iconImageError: Icons;
  imageType: ImageType;
  style: ImageStyle;
  iconSize: number;
  image: string;
  testID?: string;
  isThumbnail?: boolean;
};

export const TMDBImage = (props: TMDBImageProps) => {
  const tmdbImage = useTMDBImage({
    isThumbnail: props.isThumbnail,
    imageType: props.imageType,
    image: props.image,
    style: props.style,
  });

  return (
    <>
      {tmdbImage.uri && (
        <FastImage
          style={props.style}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: tmdbImage.uri,
          }}
          onError={tmdbImage.onError}
          onLoad={tmdbImage.onLoad}
          testID={props.testID}
        />
      )}
      {tmdbImage.isVisible && (
        <Animated.View
          style={tmdbImage.imageFallbackStyle}
          testID={'tmdb-fallback-image'}>
          {renderSVGIconConditionally({
            condition: tmdbImage.hasError,
            ifTrue: {
              color: 'fallbackImageIcon',
              size: props.iconSize,
              id: props.iconImageError,
            },
            ifFalse: {
              color: 'fallbackImageIcon',
              size: props.iconSize,
              id: props.iconImageLoading,
            },
          })}
        </Animated.View>
      )}
    </>
  );
};
