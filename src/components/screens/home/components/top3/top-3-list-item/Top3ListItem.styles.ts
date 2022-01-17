import {Animated, View, Text} from 'react-native';
import styled from 'styled-components/native';

import * as Types from '@local-types';
import metrics from '@styles/metrics';

export const ITEM_HEIGHT = metrics.getHeightFromDP('58%');
export const ITEM_MARGING = metrics.getWidthFromDP('12.5%');
export const ITEM_WIDTH = metrics.getWidthFromDP('75%');
export const ITEM_BORDER_RADIUS = metrics.mediumSize;
export const ITEM_MARGING_TOP = metrics.getWidthFromDP('15%');

type ItemWrapperStyleProps = {
  index: number;
};

type StarsWrapperStyleProps = {
  currentTheme: Types.ThemeId;
};

export const Wrapper = styled(Animated.View)<ItemWrapperStyleProps>`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  margin-horizontal: ${({index}) =>
    index === 1 ? metrics.extraLargeSize : 0}px;
`;

export const TextContentWrapper = styled(View)`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
`;

export const StarsWrapper = styled(View)<StarsWrapperStyleProps>`
  justify-content: center;
  align-items: center;
  background-color: ${({currentTheme, theme}) =>
    currentTheme === Types.ThemeId.LIGHT
      ? theme.colors.buttonText
      : 'transparent'};
  padding: ${({currentTheme, theme}) =>
    currentTheme === Types.ThemeId.LIGHT ? theme.metrics.mediumSize : 0}px;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
`;

export const TitleText = styled(Text).attrs({
  numberOfLines: 3,
})`
  margin-bottom: ${({theme}) => theme.metrics.smallSize}px;
  margin-horizontal: ${({theme}) => theme.metrics.mediumSize}px;
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

export const GenreText = styled(Text)`
  margin-top: ${({theme}) => theme.metrics.smallSize}px;
  margin-bottom: ${({theme}) => theme.metrics.largeSize}px;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
  color: ${({theme}) => theme.colors.text};
  font-family: CircularStd-Bold;
  text-align: center;
`;

export const LearnMoreButtonWrapper = styled(View)`
  width: 80%;
`;
