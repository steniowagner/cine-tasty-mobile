import React from 'react';
import { Animated, Image } from 'react-native';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

export const IMAGE_HEIGHT = metrics.getWidthFromDP('40%');

const MediaPosterImage = styled(Image)`
  width: 30%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('40%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

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

const POSTER_IMAGE_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

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
      <MediaPosterImage
        onError={onError}
        onLoad={onLoad}
        source={{
          uri: `${POSTER_IMAGE_URL}${image}`,
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
