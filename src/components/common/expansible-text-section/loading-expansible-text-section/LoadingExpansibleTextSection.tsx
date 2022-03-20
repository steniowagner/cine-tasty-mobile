import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';

import * as Styles from './LoadingExpansibleTextSection.styles';

export const NUMBER_ITEMS = 4;

const ExpansibleTextSection = () => (
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

export default ExpansibleTextSection;
