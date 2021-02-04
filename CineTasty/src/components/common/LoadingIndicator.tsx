import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
  size: 'large',
}))``;

const LoadingIndicator = () => (
  <Wrapper
    testID="loading-content-indicator"
  >
    <Indicator />
  </Wrapper>
);

export default LoadingIndicator;
