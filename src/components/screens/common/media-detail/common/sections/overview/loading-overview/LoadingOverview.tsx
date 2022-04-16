import React from 'react';

import * as Styles from './LoadingOverview.styles';

export const NUMBER_ITEMS = 4;

export const LoadingOverview = () => (
  <Styles.Wrapper testID="loading-overview">
    {Array(NUMBER_ITEMS)
      .fill({})
      .map((_, index) => (
        <Styles.Loading testID="loading-item" key={index} style={{}} />
      ))}
  </Styles.Wrapper>
);
