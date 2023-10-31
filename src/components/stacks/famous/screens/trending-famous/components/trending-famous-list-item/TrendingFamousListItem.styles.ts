import { StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import { Typography } from '@/components/common';

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14');
export const DEFAULT_WIDTH = metrics.getWidthFromDP('30');
export const DEFAULT_HEIGHT = metrics.getWidthFromDP('50');
export const DEFAULT_BORDER_RADIUS = metrics.xs;
export const DEFAULT_MARGIN_BOTTOM = metrics.xl;
export const DEFAULT_MARGIN_LEFT = metrics.getWidthFromDP('2.5');

export const PersonName = styled(Typography.ExtraSmallText).attrs({
  numberOfLines: 2,
  bold: true,
})`
  margin-top: ${({ theme }) => theme.metrics.sm}px;
`;

export const Wrapper = styled(TouchableOpacity)`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
  margin-bottom: ${DEFAULT_MARGIN_BOTTOM}px;
  margin-left: ${DEFAULT_MARGIN_LEFT}px;
`;

export const sheet = StyleSheet.create({
  image: {
    width: metrics.getWidthFromDP('30'),
    height: metrics.getWidthFromDP('40'),
    borderRadius: DEFAULT_BORDER_RADIUS,
  },
});
