import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

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

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('12%'),
  color: theme.colors.fallbackImageIcon,
}))``;

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
          <FallbackImageIcon
            name={hasError ? 'image-off' : 'movie'}
          />
        </FallbackMediaPosterImage>
      )}
    </>
  );
};

export default MediaImage;
