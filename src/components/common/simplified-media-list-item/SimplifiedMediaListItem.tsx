import React from 'react';
import {
  TouchableOpacity, Animated, Text, View,
} from 'react-native';
import styled from 'styled-components';

import renderSVGIconConditionally from 'components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from 'components/common/tmdb-image/TMDBImage';
import SVGIcon from 'components/common/svg-icon/SVGIcon';
import { useLoadListItemImage } from 'hooks';
import metrics from 'styles/metrics';

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

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

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
        <TMDBImage
          imageType="poster"
          onError={onError}
          onLoad={onLoad}
          image={image}
          style={{
            width: MEDIA_IMAGE_DEFAULT_WIDTH,
            height: MEDIA_IMAGE_DEFAULT_HEIGHT,
            marginBottom: metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM),
            borderRadius: metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_BORDER_RADIUS),
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
                id: 'video-vintage',
              },
            })}
          </FallbackImageWrapper>
        )}
      </>
      <DefaultText>{title}</DefaultText>
      <StarsContentWrapper>
        <SVGIcon
          id="star-full"
          size={metrics.getWidthFromDP('6%')}
          colorThemeRef="primary"
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
