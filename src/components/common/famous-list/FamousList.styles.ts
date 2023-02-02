import {StyleSheet} from 'react-native';

import metrics from '@styles/metrics';

export const DEFAULT_LIST_ITEM_HEIGHT = metrics.getWidthFromDP('50%');

export const DEFAULT_LIST_ITEM_WIDTH = metrics.getWidthFromDP('30%');

export const IOS_DEFAULT_LIST_ITEM_MARGIN_HORIZONTAL =
  metrics.getWidthFromDP('2.5%');

export const ANDROID_DEFAULT_LIST_ITEM_MARGIN_HORIZONTAL = metrics.smallSize;

export default StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.smallSize,
    paddingBottom: metrics.mediumSize,
    paddingLeft: metrics.getWidthFromDP('2.4%'),
  },
});
