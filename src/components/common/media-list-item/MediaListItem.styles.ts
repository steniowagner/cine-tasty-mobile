import {TouchableOpacity, View, Text} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import metrics from '@styles/metrics';

import {TMDBImage} from '../tmdb-image/TMDBImage';

type Measure = {
  width: number;
  height: number;
};

export type LayoutSize = 'large' | 'medium';

type DefaultStyleProps = {
  layoutSize: LayoutSize;
};

export const LAYOUT_MEASURES: Record<LayoutSize, Measure> = {
  large: {
    width: metrics.getWidthFromDP('40%'),
    height: metrics.getWidthFromDP('62%'),
  },
  medium: {
    width: metrics.getWidthFromDP('30.5%'),
    height: metrics.getWidthFromDP('50%'),
  },
};

export const IMAGE_LOADING_ICON_SIZE = metrics.getWidthFromDP('10%');

export const CustomTMDBImage = styled(TMDBImage)<DefaultStyleProps>`
  width: 100%;
  height: ${({layoutSize}) => LAYOUT_MEASURES[layoutSize].height}px;
  margin-bottom: ${({theme}) => theme.metrics.smallSize}px;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
`;

type WrapperStyleProps = DefaultStyleProps & {
  marginLeft?: number;
};

export const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${({layoutSize}) => LAYOUT_MEASURES[layoutSize].width}px;
  height: 100%;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
`;

export const DefaultText = styled(Text).attrs({
  numberOfLines: 2,
})<DefaultStyleProps>`
  font-family: CircularStd-Medium;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.text};
`;

export const StarsContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
`;

export const FallbackImageWrapper = styled(Animated.View)<DefaultStyleProps>`
  width: 100%;
  height: ${({layoutSize}) => LAYOUT_MEASURES[layoutSize].height}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.fallbackImageBackground};
`;

export const Gap = styled(View)`
  width: ${({theme}) => theme.metrics.extraSmallSize}px;
  height: 1px;
`;

export const MediaListItemSeparator = styled(View)`
  width: ${({theme}) => theme.metrics.mediumSize}px;
  height: 10px;
`;
