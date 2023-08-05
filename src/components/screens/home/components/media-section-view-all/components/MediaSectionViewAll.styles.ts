import {StyleSheet} from 'react-native';

import metrics from '@styles/metrics';

export const NUMBER_OF_COLUMNS = 3;

export const sheet = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.smallSize,
    paddingBottom: metrics.mediumSize,
  },
  columnWrapperStyle: {
    marginBottom: metrics.extraLargeSize,
  },
});
