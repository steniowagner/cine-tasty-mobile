import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

export const NUMBER_ITEMS = 4;

const Wrapper = styled(View)`
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const LoadingOverview = () => (
  <Wrapper
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
  </Wrapper>
);

export default LoadingOverview;
