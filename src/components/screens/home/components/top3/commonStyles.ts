import { Animated, Platform, View } from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import metrics from 'styles/metrics';

export const ITEM_HEIGHT = metrics.getHeightFromDP('58%');
export const ITEM_MARGING_HORIZONTAL = metrics.largeSize;
export const ITEM_WIDTH = metrics.getWidthFromDP('75%');
export const ITEM_BORDER_RADIUS = metrics.mediumSize;
export const ITEM_MARGING_TOP = 50;

export const SPACER_ITEM_SIZE = (metrics.width - (ITEM_WIDTH + 2 * metrics.largeSize)) / 2;

interface ItemWrapperStyleProps {
  readonly isTheMiddle: boolean;
  readonly width: number;
}

export const ItemWrapper = styled(Animated.View)<ItemWrapperStyleProps>`
  width: ${ITEM_WIDTH}px;
  margin-horizontal: ${({ isTheMiddle, theme }) => (isTheMiddle ? theme.metrics.largeSize : 0)}px;
  height: ${ITEM_HEIGHT}px;
`;

export const GapFlatlist = styled(View)`
  width: ${SPACER_ITEM_SIZE}px;
  height: 1px;
`;

export const ListWrapper = styled(View)`
  width: 100%;
  height: ${ITEM_HEIGHT + ITEM_MARGING_TOP}px;
  margin-top: ${({ theme }) => Platform.select({
    android: theme.metrics.getWidthFromDP('22%'),
    ios: theme.metrics.getWidthFromDP('30%'),
  })}px;
`;

export const LoadingSmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', theme.colors.background],
}))<Pick<ItemWrapperStyleProps, 'isTheMiddle'>>`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  margin-horizontal: ${({ isTheMiddle, theme }) => (isTheMiddle ? theme.metrics.largeSize : 0)}px;
  margin-top: ${({ isTheMiddle }) => (!isTheMiddle ? ITEM_MARGING_TOP : 0)}px;
  border-radius: ${ITEM_BORDER_RADIUS}px;
  position: absolute;
`;

export const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', theme.colors.backgroundAlphax1, theme.colors.background],
}))<Pick<ItemWrapperStyleProps, 'isTheMiddle'>>`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  margin-horizontal: ${({ isTheMiddle, theme }) => (isTheMiddle ? theme.metrics.largeSize : 0)}px;
  position: absolute;
`;
