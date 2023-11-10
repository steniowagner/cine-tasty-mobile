import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { borderRadius } from '@styles/border-radius';
import metrics from '@/styles/metrics';

export const DEFAULT_ICON_SIZE = metrics.xl * 2;

export type Orientation = 'PORTRAIT' | 'LANDSCAPE';

export type ImageOrientation = {
  orientation: Orientation;
};

export const Wrapper = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.metrics.md}px;
`;

export const makeImageStyle = (orientation: Orientation) => {
  const width = orientation === 'PORTRAIT' ? '36' : '60';
  const height = orientation === 'PORTRAIT' ? '44' : '36';
  return StyleSheet.create({
    image: {
      width: metrics.getWidthFromDP(width),
      height: metrics.getWidthFromDP(height),
      borderRadius: borderRadius.xs,
    },
  });
};
