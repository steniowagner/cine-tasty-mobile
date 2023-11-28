import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { borderRadius } from '@/styles/border-radius';
import { Typography } from '@/components/common';
import metrics from '@styles/metrics';

export const DEFAULT_ICON_SIZE = metrics.xl * 3;
const DEFAULT_WIDTH = metrics.xl * 8;
const DEFAULT_HEIGHT = metrics.xl * 12;

export const Wrapper = styled.TouchableOpacity`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
  margin-right: ${({ theme }) => theme.metrics.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.xs}px;
`;

export const SmokeShadow = styled(LinearGradient).attrs(() => ({
  colors: [
    ...Array(4).fill('transparent'),
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 0.8)',
    'rgba(0, 0, 0, 1)',
  ],
}))`
  width: 100%;
  height: 100%;
  position: absolute;
  border-bottom-left-radius: ${({ theme }) => theme.metrics.xs}px;
  border-bottom-right-radius: ${({ theme }) => theme.metrics.xs}px;
`;

export const TextContentWrapper = styled.View`
  width: 100%;
  position: absolute;
  padding-bottom: ${({ theme }) => theme.metrics.xl}px;
  padding-horizontal: ${({ theme }) => theme.metrics.sm}px;
  bottom: 0;
`;

export const sheet = StyleSheet.create({
  image: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    borderRadius: borderRadius.xs,
  },
});

export const SubText = styled(Typography.ExtraSmallText).attrs(({ theme }) => ({
  color: theme.colors.primary,
}))`
  margin-top: ${({ theme }) => theme.metrics.xs}px;
`;
