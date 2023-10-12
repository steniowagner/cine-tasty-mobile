import Animated from 'react-native-reanimated';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

import { Typography, SVGIcon } from '@/components/common';
import metrics from '@styles/metrics';

export const DEFAULT_HEIGHT = metrics.getWidthFromDP('12%');

export const Wrapper = styled(Animated.View)`
  height: ${DEFAULT_HEIGHT}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: ${({ theme }) => theme.borderRadius.xs}px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
  position: absolute;
`;

const baseTextMessageStyle = css`
  margin-left: ${({ theme }) => theme.metrics.sm}px;
  letter-spacing: 0.1px;
`;

export const Message = styled(Typography.ExtraSmallText).attrs(({ theme }) => ({
  color: theme.colors.buttonText,
  bold: true,
}))`
  ${Platform.OS === 'android'
    ? baseTextMessageStyle
    : css`
        ${baseTextMessageStyle}
        line-height: 0px;
      `}
`;

export const Icon = styled(SVGIcon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('6.5%'),
  color: 'buttonText',
}))``;
