import React from 'react';
import { TouchableOpacity, Animated, Image } from 'react-native';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

interface WrapperStyleProps {
  readonly isFirst?: boolean;
}

const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('32%')}px;
  margin-left: ${({ isFirst }) => {
    if (isFirst) {
      return CONSTANTS.VALUES.DEFAULT_SPACING;
    }

    return 0;
  }}px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const ItemImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: theme.colors.fallbackImageIcon,
}))``;

const IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.PROFILE_SIZE_CODE}`;

type Props = {
  onPress: () => void;
  isFirst: boolean;
  image: string;
};

const ImageListItem = ({ onPress, isFirst, image }: Props) => {
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
    <Wrapper
      onPress={onPress}
      isFirst={isFirst}
    >
      <ItemImage
        source={{
          uri: `${IMAGE_URI}${image}`,
        }}
        resizeMode="cover"
        onError={onError}
        onLoad={onLoad}
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
            name={hasError ? 'image-off' : 'image'}
          />
        </FallbackImageWrapper>
      )}
    </Wrapper>
  );
};

export default ImageListItem;
