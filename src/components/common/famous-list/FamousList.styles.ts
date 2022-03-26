import {StyleSheet} from 'react-native';

import metrics from '@styles/metrics';

export const DEFAULT_LIST_ITEM_HEIGHT = metrics.getWidthFromDP('50%');

export default StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.smallSize,
    paddingBottom: metrics.mediumSize,
    paddingLeft: metrics.getWidthFromDP('2.4%'),
  },
});
