import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

const FallbackImageWrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('22%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('22%')}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('1%')}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: theme.colors.fallbackImageIcon,
}))``;

type Props = {
  profileImage: string;
};

const ProfileImage = ({ profileImage }: Props) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image: profileImage,
  });

  return (
    <>
      <TMDBImage
        imageType="profile"
        onError={onError}
        onLoad={onLoad}
        image={profileImage}
        testID="profile-image"
        style={{
          width: metrics.getWidthFromDP('22%'),
          height: metrics.getWidthFromDP('22%'),
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
            name={hasError ? 'image-off' : 'account'}
          />
        </FallbackImageWrapper>
      )}
    </>
  );
};

export default ProfileImage;
