import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './MediaImage.styles';

export const IMAGE_HEIGHT = metrics.getWidthFromDP('40%');

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type MediaImageProps = {
  image: string;
};

const MediaImage = ({ image }: MediaImageProps) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
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
          width: '30%',
          height: metrics.getWidthFromDP('40%'),
          marginHorizontal: metrics.smallSize,
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {isFallbackImageVisible && (
        <Styles.FallbackMediaPosterImage
          testID="fallback-image-wrapper"
          style={[
            {
              opacity,
            },
          ]}
        >
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
              id: 'video-vintage',
            },
          })}
        </Styles.FallbackMediaPosterImage>
      )}
    </>
  );
};

export default MediaImage;
