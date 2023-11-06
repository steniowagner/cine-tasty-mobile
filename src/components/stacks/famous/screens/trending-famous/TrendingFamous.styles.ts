import { StyleSheet } from 'react-native';

import { DEFAULT_HEIGHT } from '@/components/common/default-tmdb-list-item/DefaultTMDBListItem.styles';
import metrics from '@styles/metrics';

export const sheet = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.md,
  },
});
