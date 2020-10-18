import React from 'react';
import {
  TouchableOpacity, Animated, Image, Text, View,
} from 'react-native';
import styled from 'styled-components';

import { useLoadListItemImage } from 'hooks';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

export const MEDIA_IMAGE_DEFAULT_BORDER_RADIUS = '2%';
export const MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM = '2%';
export const MEDIA_IMAGE_DEFAULT_WIDTH = '100%';
export const MEDIA_IMAGE_DEFAULT_HEIGHT = '70%';

export const WRAPPER_DEFAULT_WIDTH = '40%';
export const WRAPPER_DEFAULT_HEIGHT = '75%';

interface DefaultTextStyleProps {
  readonly withMarginLeft?: boolean;
}

interface WrapperStyleProps {
  readonly isFirst?: boolean;
}

const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(WRAPPER_DEFAULT_WIDTH)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(WRAPPER_DEFAULT_HEIGHT)}px;
  margin-left: ${({ isFirst, theme }) => {
    if (isFirst) {
      return theme.metrics.largeSize;
    }

    return 0;
  }}px;
  margin-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

const MediaImage = styled(Image)`
  width: ${MEDIA_IMAGE_DEFAULT_WIDTH};
  height: ${MEDIA_IMAGE_DEFAULT_HEIGHT};
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM)}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_BORDER_RADIUS)}px;
`;

const DefaultText = styled(Text).attrs({
  numberOfLines: 2,
})<DefaultTextStyleProps>`
  margin-left: ${({ withMarginLeft, theme }) => (withMarginLeft ? theme.metrics.extraSmallSize : 0)}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

const StarsContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

const FallbackImageWrapper = styled(Animated.View)`
  width: ${MEDIA_IMAGE_DEFAULT_WIDTH};
  height: ${MEDIA_IMAGE_DEFAULT_HEIGHT};
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_BORDER_RADIUS)}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

const MEDIA_IMAGE_URI = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.MEDIA_POSTER_SIZE_CODE}`;

const StarIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('6%'),
  color: '#FFD700',
}))``;

const FallbackImageIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('14%'),
  color: theme.colors.fallbackImageIcon,
}))``;

type Props = {
  onPress: () => void;
  voteAverage: number;
  voteCount: number;
  isFirst: boolean;
  image: string;
  title: string;
};

const SimplifiedMediaListItem = ({
  voteAverage,
  voteCount,
  isFirst,
  onPress,
  image,
  title,
}: Props) => {
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
      testID="simplified-media-list-button"
      onPress={onPress}
      isFirst={isFirst}
    >
      <>
        <MediaImage
          onError={onError}
          onLoad={onLoad}
          source={{
            uri: `${MEDIA_IMAGE_URI}${image}`,
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
              name={hasError ? 'image-off' : 'video-vintage'}
            />
          </FallbackImageWrapper>
        )}
      </>
      <DefaultText>{title}</DefaultText>
      <StarsContentWrapper>
        <StarIcon
          name="star"
        />
        <DefaultText
          withMarginLeft
        >
          {`${voteAverage.toFixed(1)} (${voteCount})`}
        </DefaultText>
      </StarsContentWrapper>
    </Wrapper>
  );
};

export default SimplifiedMediaListItem;
