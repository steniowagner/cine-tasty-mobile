import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import { Typography } from '@/components/common';
import metrics from '@styles/metrics';

export const DEFAULT_ICON_SIZE = metrics.xl * 2;
const IMAGE_WIDTH = metrics.xl * 2.5;
const IMAGE_HEIGHT = metrics.xl * 2.8;

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.xl}px;
`;

export const PressableContent = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const FallbackImageWrapper = styled(Animated.View)`
  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  background-color: ${({ theme }) => theme.colors.fallbackImageBackground};
`;

export const ItemText = styled(Typography.ExtraSmallText).attrs({
  numberOfLines: 2,
})`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('55%')}px;
  margin-left: ${({ theme }) => theme.metrics.md}px;
  margin-right: ${({ theme }) => theme.metrics.xl}px;
`;

export const CloseButtonWrapper = styled.TouchableOpacity.attrs(
  ({ theme }) => ({
    hitSlop: {
      top: theme.metrics.lg,
      bottom: theme.metrics.lg,
      left: theme.metrics.lg,
      right: theme.metrics.lg,
    },
  }),
)``;

export const sheet = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: metrics.xs,
  },
});
