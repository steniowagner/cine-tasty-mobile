import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, styled, DefaultTheme } from 'styled-components/native';

import { dark } from '@styles/themes/dark';

const C = styled(View)`
  width: ${x => x.theme.metrics.largeSize}px;
  height: ${x => x.theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.red};
`;

export const App = () => (
  <ThemeProvider theme={dark as DefaultTheme}>
    <C />
  </ThemeProvider>
);
