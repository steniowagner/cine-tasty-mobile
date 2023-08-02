import {StyleSheet} from 'react-native';

import {WRAPPER_HEIGHT} from '@routes/components/tab-navigator/TabNavigator.styles';
import metrics from '@styles/metrics';

export const NUMBER_OF_COLUMNS = 3;

export const sheet = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.mediumSize,
    paddingBottom: WRAPPER_HEIGHT,
  },
});
