import {StyleSheet} from 'react-native';

import metrics from '@styles/metrics';

export default StyleSheet.create({
  contentContainerStyle: {
    paddingTop: metrics.smallSize,
    paddingBottom: metrics.mediumSize,
    paddingLeft: metrics.getWidthFromDP('2.4%'),
  },
});
