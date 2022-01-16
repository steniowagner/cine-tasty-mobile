import React from 'react';

import * as Styles from './LoadingIndicator.styles';

const LoadingIndicator = () => (
  <Styles.Wrapper
    testID="loading-content-indicator"
  >
    <Styles.Indicator />
  </Styles.Wrapper>
);

export default LoadingIndicator;
