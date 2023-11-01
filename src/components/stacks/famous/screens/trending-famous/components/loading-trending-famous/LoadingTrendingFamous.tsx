import React from 'react';

import { LoadingPlaceholder } from '@common-components';

import * as Styles from './LoadingTrendingFamous.styles';

export const LoadingTrendingFamous = () => (
  <Styles.Wrapper testID="trending-famous-loading-list">
    {Array(14)
      .fill({})
      .map((_, index) => (
        <LoadingPlaceholder
          indexToDelayAnimation={index}
          style={Styles.sheet.loading}
          key={`${index}`}
        />
      ))}
  </Styles.Wrapper>
);
