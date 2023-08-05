import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const SEPARATOR_HEIGHT = metrics.extraLargeSize;

export const Separator = styled(View)`
  width: 100%;
  height: ${SEPARATOR_HEIGHT}px;
`;

export const sheet = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.smallSize,
    paddingBottom: metrics.mediumSize,
  },
});
