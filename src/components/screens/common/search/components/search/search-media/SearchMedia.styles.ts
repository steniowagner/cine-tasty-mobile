import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

import metrics from '@styles/metrics';

export const Separator = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.extraLargeSize}px;
`;

export const sheet = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: metrics.smallSize,
    paddingTop: metrics.smallSize,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});
