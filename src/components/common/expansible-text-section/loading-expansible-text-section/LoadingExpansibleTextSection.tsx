import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import metrics from '@styles/metrics';

import * as Styles from './LoadingExpansibleTextSection.styles';

export const NUMBER_ITEMS = 4;

const ExpansibleTextSection = () => (
  <Styles.Wrapper
    testID="loading-expansible-text-section"
  >
    {Array(NUMBER_ITEMS)
      .fill({})
      .map((_, index) => (
        <LoadingPlaceholder
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            borderRadius: metrics.extraLargeSize / 2,
            marginBottom: metrics.mediumSize,
            height: metrics.largeSize,
            width: '100%',
          }}
        />
      ))}
  </Styles.Wrapper>
);

export default ExpansibleTextSection;
