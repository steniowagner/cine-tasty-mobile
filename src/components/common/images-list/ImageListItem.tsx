import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import CONSTANTS from '@utils/constants';
import metrics from '@styles/metrics';

type WrapperStyleProps = {
  isFirst?: boolean;
};

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

const FallbackImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

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
      <TMDBImage
        imageType="backdrop"
        onError={onError}
        onLoad={onLoad}
        image={image}
        style={{
          width: '100%',
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
              id: 'image',
            },
          })}
        </FallbackImageWrapper>
      )}
    </Wrapper>
  );
};

export default ImageListItem;
