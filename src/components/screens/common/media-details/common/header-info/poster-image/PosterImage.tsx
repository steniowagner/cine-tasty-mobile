import React from 'react';

import {renderSVGIconConditionally, Icons} from '@components';
import {useImageFallbackView} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './PosterImage.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type PosterImageProps = {
  loadingIcon?: Icons;
  image: string;
};

export const PosterImage = (props: PosterImageProps) => {
  const imageFallbackView = useImageFallbackView({
    image: props.image,
  });
  return (
    <>
      <Styles.TMDBImageStyled
        onError={imageFallbackView.onError}
        onLoad={imageFallbackView.onLoad}
        testID="poster-image"
        image={props.image}
        imageType="poster"
        style={{}}
      />
      {imageFallbackView.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={imageFallbackView.imageFallbackViewStyle}>
          {renderSVGIconConditionally({
            condition: imageFallbackView.hasError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: props.loadingIcon || 'account',
            },
          })}
        </Styles.FallbackImageWrapper>
      )}
    </>
  );
};
