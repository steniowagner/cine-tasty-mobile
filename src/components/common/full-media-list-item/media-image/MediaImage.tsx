import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './MediaImage.styles';

type MediaImageProps = {
  image: string;
};

const MediaImage = (props: MediaImageProps) => {
  const loadListItemImage = useLoadListItemImage({
    image: props.image,
  });

  return (
    <>
      <TMDBImage
        onError={loadListItemImage.onError}
        onLoad={loadListItemImage.onLoad}
        image={props.image}
        imageType="poster"
        style={{
          width: '30%',
          height: metrics.getWidthFromDP('40%'),
          marginHorizontal: metrics.smallSize,
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {loadListItemImage.isFallbackImageVisible && (
        <Styles.FallbackMediaPosterImage
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: loadListItemImage.opacity,
            },
          ]}
        >
          {renderSVGIconConditionally({
            condition: loadListItemImage.hasError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'video-vintage',
            },
          })}
        </Styles.FallbackMediaPosterImage>
      )}
    </>
  );
};

export default MediaImage;
