import React from 'react';
import Animated from 'react-native-reanimated';

import {renderSVGIconConditionally, Icons} from '@components';
import * as Types from '@local-types';

import {useTMDBImageWithFallback, Style} from './useTMDBImageWithFallback';
import {TMDBImage} from '../TMDBImage';

type TMDBImageWithFallbackProps = {
  iconImageLoading: Icons;
  iconImageError: Icons;
  imageType: Types.ImageType;
  style: Style;
  iconSize: number;
  image: string;
  testID?: string;
};

export const TMDBImageWithFallback = (props: TMDBImageWithFallbackProps) => {
  const tmdbImageWithFallback = useTMDBImageWithFallback({
    image: props.image,
    style: props.style,
  });

  return (
    <>
      <TMDBImage
        imageType={props.imageType}
        onError={tmdbImageWithFallback.onError}
        onLoad={tmdbImageWithFallback.onLoad}
        image={props.image}
        testID={props.testID}
        style={props.style}
      />
      {tmdbImageWithFallback.isVisible && (
        <Animated.View
          style={tmdbImageWithFallback.imageFallbackViewStyle}
          testID="tmdb-fallback-image">
          {renderSVGIconConditionally({
            condition: tmdbImageWithFallback.hasError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: props.iconSize,
              id: props.iconImageError,
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: props.iconSize,
              id: props.iconImageLoading,
            },
          })}
        </Animated.View>
      )}
    </>
  );
};
