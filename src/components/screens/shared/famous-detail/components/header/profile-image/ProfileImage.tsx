import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

const IMAGE_SQUARE_PERCENTAGE = '28%';

const FallbackImageWrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_SQUARE_PERCENTAGE)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_SQUARE_PERCENTAGE)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('1%')}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

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
          width: metrics.getWidthFromDP(IMAGE_SQUARE_PERCENTAGE),
          height: metrics.getWidthFromDP(IMAGE_SQUARE_PERCENTAGE),
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
              id: 'account',
            },
          })}
        </FallbackImageWrapper>
      )}
    </>
  );
};

export default ProfileImage;
