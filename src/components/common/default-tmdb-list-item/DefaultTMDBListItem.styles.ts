import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from '@/components/common';
import { borderRadius } from '@/styles/border-radius';
import metrics from '@styles/metrics';

export const DEFAULT_ICON_SIZE = metrics.xl * 3;
export const DEFAULT_WIDTH = metrics.getWidthFromDP('30');
export const DEFAULT_HEIGHT = metrics.getWidthFromDP('50');
export const DEFAULT_BORDER_RADIUS = metrics.xs;
export const DEFAULT_MARGIN_BOTTOM = metrics.xl;
export const DEFAULT_MARGIN_LEFT = metrics.getWidthFromDP('2.5');
const IMAGE_WIDTH = metrics.getWidthFromDP('30');
const IMAGE_HEIGHT = metrics.getWidthFromDP('40');
const TEXT_MARGIN_TOP = metrics.sm;

export const FamousName = styled(Typography.ExtraSmallText).attrs({
  numberOfLines: 2,
  bold: true,
})`
  margin-top: ${TEXT_MARGIN_TOP}px;
`;

export const Wrapper = styled.TouchableOpacity`
  width: ${DEFAULT_WIDTH}px;
  height: ${DEFAULT_HEIGHT}px;
  margin-bottom: ${DEFAULT_MARGIN_BOTTOM}px;
  margin-left: ${DEFAULT_MARGIN_LEFT}px;
`;

export const sheet = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: DEFAULT_BORDER_RADIUS,
  },
  loading: {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  loadingImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: DEFAULT_BORDER_RADIUS,
  },
  loadingText: {
    width: IMAGE_WIDTH,
    height: metrics.lg,
    borderRadius: borderRadius.xs,
    marginTop: TEXT_MARGIN_TOP,
  },
});
