import {
  TouchableOpacity, Animated, View, Text,
} from 'react-native';
import styled from 'styled-components';

export const MEDIA_IMAGE_DEFAULT_BORDER_RADIUS = '2%';
export const MEDIA_IMAGE_DEFAULT_MARGIN_BOTTOM = '2%';
export const MEDIA_IMAGE_DEFAULT_WIDTH = '100%';
export const MEDIA_IMAGE_DEFAULT_HEIGHT = '70%';
export const WRAPPER_DEFAULT_WIDTH = '40%';
export const WRAPPER_DEFAULT_HEIGHT = '75%';

type DefaultTextStyleProps = {
  withMarginLeft?: boolean;
};

type WrapperStyleProps = {
  isFirst?: boolean;
};

export const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
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

export const DefaultText = styled(Text).attrs({
  numberOfLines: 2,
})<DefaultTextStyleProps>`
  margin-left: ${({ withMarginLeft, theme }) => (withMarginLeft ? theme.metrics.extraSmallSize : 0)}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StarsContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${MEDIA_IMAGE_DEFAULT_WIDTH};
  height: ${MEDIA_IMAGE_DEFAULT_HEIGHT};
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP(MEDIA_IMAGE_DEFAULT_BORDER_RADIUS)}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;
