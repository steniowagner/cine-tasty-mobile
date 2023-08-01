import React from 'react';

import {LoadingPlaceholder} from '@components';

import * as Styles from './LoadingFamous.styles';

export const LoadingFamous = () => (
  <Styles.Wrapper testID="famous-loading-list">
    {Array(10)
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
