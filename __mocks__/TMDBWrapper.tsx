import React from 'react';
import { ThemeProvider } from 'styled-components';

import { TMDBImageQualityProvider } from '../src/providers/tmdb-image-quality/TMDBImageQuality';
import theme from '../src/styles/theme';

type TMDBWrapperProps = {
  children: JSX.Element;
};

const TMDBWrapper = ({ children }: TMDBWrapperProps) => (
  <TMDBImageQualityProvider>
    <ThemeProvider
      theme={theme}
    >
      {children}
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

export default TMDBWrapper;
