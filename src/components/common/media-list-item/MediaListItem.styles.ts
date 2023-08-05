import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import {CONSTANTS} from '@utils';

type Measure = {
  width: number;
  height: number;
  marginRight: number;
  marginLeft: number;
};

export type LayoutSize = 'large' | 'medium';

type DefaultStyleProps = {
  layoutSize: LayoutSize;
};

export const LAYOUT_MEASURES: Record<LayoutSize, Measure> = {
  large: {
    width: metrics.getWidthFromDP('40%'),
    height: metrics.getWidthFromDP('62%'),
    marginRight: CONSTANTS.VALUES.DEFAULT_SPACING,
    marginLeft: 0,
  },
  medium: {
    width: metrics.getWidthFromDP('30.5%'),
    height: metrics.getWidthFromDP('50%'),
    marginRight: 0,
    marginLeft: (metrics.width - metrics.getWidthFromDP('30.5%') * 3) / 4,
  },
};

export const makeImageStyles = (layoutSize: LayoutSize) =>
  StyleSheet.create({
    image: {
      width: LAYOUT_MEASURES[layoutSize].width,
      height: LAYOUT_MEASURES[layoutSize].height,
      marginBottom: metrics.smallSize,
      borderRadius: metrics.smallSize,
    },
  });

export const IMAGE_LOADING_ICON_SIZE = metrics.getWidthFromDP('10%');

type WrapperStyleProps = DefaultStyleProps & {
  marginLeft?: number;
};

export const Wrapper = styled(TouchableOpacity)<WrapperStyleProps>`
  width: ${({layoutSize}) => LAYOUT_MEASURES[layoutSize].width}px;
  height: 100%;
  margin-right: ${({layoutSize}) => LAYOUT_MEASURES[layoutSize].marginRight}px;
  margin-left: ${({layoutSize}) => LAYOUT_MEASURES[layoutSize].marginLeft}px;
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

export const Gap = styled(View)`
  width: ${({theme}) => theme.metrics.extraSmallSize}px;
  height: 1px;
`;
