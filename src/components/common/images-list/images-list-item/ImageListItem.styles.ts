import {TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';
import {CONSTANTS} from '@utils';

type Orientation = 'PORTRAIT' | 'LANDSCAPE';

export type ImageOrientation = {
  orientation: Orientation;
};

export const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('12%');

const calculateWidth = (orientation: Orientation) => {
  const percentage = orientation === 'PORTRAIT' ? '35%' : '60%';
  return metrics.getWidthFromDP(percentage);
};

const calculateHeight = (orientation: Orientation) => {
  const percentage = orientation === 'PORTRAIT' ? '45%' : '38%';
  return metrics.getWidthFromDP(percentage);
};

export const Wrapper = styled(TouchableOpacity)`
  margin-right: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

export const makeImageStyle = (orientation: Orientation) =>
  StyleSheet.create({
    image: {
      width: calculateWidth(orientation),
      height: calculateHeight(orientation),
      borderRadius: metrics.extraSmallSize,
    },
  });
