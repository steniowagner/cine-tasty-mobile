import React from 'react';

import {renderSVGIconConditionally, TMDBImage} from '@components';
import {useLoadListItemImage} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './PosterImage.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type PosterImageProps = {
  image: string;
};

const PosterImage = ({image}: PosterImageProps) => {
  const {isFallbackImageVisible, hasError, onError, opacity, onLoad} =
    useLoadListItemImage({
      image,
    });

  return (
    <>
      <TMDBImage
        onError={onError}
        onLoad={onLoad}
        image={image}
        imageType="poster"
        style={{
          width: metrics.getWidthFromDP('30%'),
          height: '100%',
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity,
            },
          ]}>
          {renderSVGIconConditionally({
            condition: hasError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'account',
            },
          })}
        </Styles.FallbackImageWrapper>
      )}
    </>
  );
};

export default PosterImage;
