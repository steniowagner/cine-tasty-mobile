import {StyleSheet} from 'react-native';

import {LAYOUT_MEASURES} from '@src/components/common/media-list-item/MediaListItem.styles';
import metrics from '@styles/metrics';

export const NUMBER_OF_COLUMNS = 3;

export const sheet = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: metrics.mediumSize,
  },
  columnWrapperStyle: {
    marginBottom: metrics.extraLargeSize,
  },
  item: {
    marginLeft:
      (metrics.width - LAYOUT_MEASURES.medium.width * NUMBER_OF_COLUMNS) / 4,
  },
});
