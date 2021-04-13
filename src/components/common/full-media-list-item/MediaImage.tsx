import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

export const IMAGE_HEIGHT = metrics.getWidthFromDP('40%');

const FallbackMediaPosterImage = styled(Animated.View)`
  width: 30%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

type Props = {
  image: string;
};

const MediaImage = ({ image }: Props) => {
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
        <FallbackMediaPosterImage
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
        </FallbackMediaPosterImage>
      )}
    </>
  );
};

export default MediaImage;
