import React from 'react';

import {LoadingPlaceholder} from '@components';

import * as Styles from './LoadingOverview.styles';

export const NUMBER_ITEMS = 4;

export const LoadingOverview = () => (
  <Styles.Wrapper testID="loading-overview">
    {Array(NUMBER_ITEMS)
      .fill({})
      .map((_, index) => (
        <LoadingPlaceholder
          style={Styles.loadinhPlaceholderStyle}
          indexToDelayAnimation={index}
          testID="loading-item"
          key={index}
        />
      ))}
  </Styles.Wrapper>
);
