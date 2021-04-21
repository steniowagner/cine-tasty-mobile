import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import metrics from '@styles/metrics';

import * as Styles from './LoadingOverview.styles';

export const NUMBER_ITEMS = 4;

const LoadingOverview = () => (
  <Styles.Wrapper
    testID="loading-overview"
  >
    {Array(NUMBER_ITEMS)
      .fill({})
      .map((_, index) => (
        <LoadingPlaceholder
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            width: '100%',
            height: metrics.largeSize,
            marginBottom: metrics.mediumSize,
            borderRadius: metrics.extraLargeSize / 2,
          }}
        />
      ))}
  </Styles.Wrapper>
);

export default LoadingOverview;
