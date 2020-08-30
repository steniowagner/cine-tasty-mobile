import React from 'react';
import { Animated, Image } from 'react-native';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

const PERSON_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

export const DEFAULT_BORDER_RADIUSIMAGE_SIZE_PERCENTAGE = '1%';
export const DEFAULT_IMAGE_SIZE_PERCENTAGE = '22%';

const FamousImage = styled(Image)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE)}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(DEFAULT_IMAGE_SIZE_PERCENTAGE)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP(DEFAULT_BORDER_RADIUSIMAGE_SIZE_PERCENTAGE)}px;
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
      <FamousImage
        onError={onError}
        onLoad={onLoad}
        source={{
          uri: `${PERSON_IMAGE_URI}${profileImage}`,
        }}
        testID="profile-image"
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
