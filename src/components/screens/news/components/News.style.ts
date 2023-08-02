import {StyleSheet} from 'react-native';

import {WRAPPER_HEIGHT} from '@routes/components/tab-navigator/TabNavigator.styles';
import metrics from '@styles/metrics';

import {imageWrapper} from './list-item/NewsListItem.styles';

export const LIST_ITEM_HEIGHT = imageWrapper.height + 2 * metrics.mediumSize;

export const sheet = StyleSheet.create({
  wrapper: {
    paddingBottom: WRAPPER_HEIGHT,
  },
});
