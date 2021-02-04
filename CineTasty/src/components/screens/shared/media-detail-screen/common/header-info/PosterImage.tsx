import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: theme.colors.fallbackImageIcon,
}))``;

const FallbackImageWrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

type Props = {
  image: string;
};

const PosterImage = ({ image }: Props) => {
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
          width: metrics.getWidthFromDP('30%'),
          height: '100%',
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {isFallbackImageVisible && (
        <FallbackImageWrapper
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
        </FallbackImageWrapper>
      )}
    </>
  );
};

export default PosterImage;
