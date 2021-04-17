import {
  TouchableOpacity, Animated, Text, View,
} from 'react-native';
import styled from 'styled-components';

import metrics from '@styles/metrics';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('10%');
export const IMAGE_WIDTH_PERCENTAGE = '21%';
export const IMAGE_HEIGHT_PERCENTAGE = '21%';

export const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
`;

export const PressableContent = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_WIDTH_PERCENTAGE)}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP(IMAGE_HEIGHT_PERCENTAGE)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

export const ItemText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CloseButtonWrapper = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))``;
