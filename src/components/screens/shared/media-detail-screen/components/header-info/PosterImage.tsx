import React from 'react';
import { Animated, Image } from 'react-native';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

import { posterImageStyles } from './common';

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: theme.colors.fallbackImageIcon,
}))``;

const PosterPic = styled(Image)`
  width: ${posterImageStyles.width}px;
  height: ${posterImageStyles.height};
  border-radius: ${posterImageStyles.borderRadius}px;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: ${posterImageStyles.width}px;
  height: ${posterImageStyles.height};
  border-radius: ${posterImageStyles.borderRadius}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

type Props = {
  image: string;
};

const POSTER_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

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
      <PosterPic
        onError={onError}
        onLoad={onLoad}
        source={{
          uri: `${POSTER_IMAGE_URI}${image}`,
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
