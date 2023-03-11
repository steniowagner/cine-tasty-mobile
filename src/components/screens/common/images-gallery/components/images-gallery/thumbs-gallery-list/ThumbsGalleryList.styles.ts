import {StyleSheet} from 'react-native';

import metrics from '@styles/metrics';

export const sheet = StyleSheet.create({
  list: {
    paddingHorizontal: metrics.mediumSize,
    paddingTop: metrics.getWidthFromDP('10%'),
  },
});
