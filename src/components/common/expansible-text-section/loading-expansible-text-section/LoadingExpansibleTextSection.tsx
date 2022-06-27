import React from 'react';

import {LoadingPlaceholder} from '@components';

import * as Styles from './LoadingExpansibleTextSection.styles';

export const NUMBER_ITEMS = 4;

export const LoadingExpansibleTextSection = () => (
  <Styles.Wrapper testID="loading-expansible-text-section">
    {Array(NUMBER_ITEMS)
      .fill({})
      .map((_, index) => (
        <LoadingPlaceholder
          style={Styles.loadingPlaceholderStyle}
          key={index}
        />
      ))}
  </Styles.Wrapper>
);
