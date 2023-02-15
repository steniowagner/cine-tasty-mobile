import {TouchableOpacity, View, Text} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import {TMDBImage} from '../tmdb-image/TMDBImage';

export const WRAPPER_DEFAULT_WIDTH = '40%';
export const WRAPPER_DEFAULT_HEIGHT = '68%';
export const WRAPPER_LARGE_WIDTH = '45%';
export const WRAPPER_LARGE_HEIGHT = '85%';

type DefaultTextStyleProps = {
  withMarginLeft?: boolean;
};

type LargeLayoutStyleProps = {
  withLargeLayout?: boolean;
};

export const CustomTMDBImage = styled(TMDBImage)<LargeLayoutStyleProps>`
  width: 100%;
  height: ${({withLargeLayout, theme}) => {
    const heightPercentage = withLargeLayout
      ? WRAPPER_LARGE_HEIGHT
      : WRAPPER_DEFAULT_HEIGHT;
    return theme.metrics.getWidthFromDP(heightPercentage);
  }}px;
  margin-bottom: ${({theme}) => theme.metrics.smallSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
`;

export const Wrapper = styled(TouchableOpacity)<LargeLayoutStyleProps>`
  margin-right: ${({theme}) => theme.metrics.mediumSize}px;
  width: ${({withLargeLayout, theme}) => {
    const widthPercentage = withLargeLayout
      ? WRAPPER_LARGE_WIDTH
      : WRAPPER_DEFAULT_WIDTH;
    return theme.metrics.getWidthFromDP(widthPercentage);
  }}px;
  height: 100%;
`;

export const DefaultText = styled(Text).attrs({
  numberOfLines: 2,
})<DefaultTextStyleProps & LargeLayoutStyleProps>`
  margin-left: ${({withMarginLeft, theme}) =>
    withMarginLeft ? theme.metrics.extraSmallSize : 0}px;
  font-family: CircularStd-Medium;
  font-size: ${({withLargeLayout, theme}) =>
    withLargeLayout ? theme.metrics.extraLargeSize : theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.text};
`;

export const StarsContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
`;

export const FallbackImageWrapper = styled(
  Animated.View,
)<LargeLayoutStyleProps>`
  width: 100%;
  height: ${({withLargeLayout, theme}) => {
    const heightPercentage = withLargeLayout
      ? WRAPPER_LARGE_HEIGHT
      : WRAPPER_DEFAULT_HEIGHT;
    return theme.metrics.getWidthFromDP(heightPercentage);
  }}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;
