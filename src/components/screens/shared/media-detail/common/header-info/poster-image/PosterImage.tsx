import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './PosterImage.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type PosterImageProps = {
  image: string;
};

const PosterImage = (props: PosterImageProps) => {
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
          width: metrics.getWidthFromDP('30%'),
          height: '100%',
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {loadListItemImage.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
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
