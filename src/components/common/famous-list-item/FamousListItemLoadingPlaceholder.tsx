import React from 'react';
import { DefaultTheme, withTheme } from 'styled-components';

import metrics from 'styles/metrics';

import LoadingPlaceholder from '../loading-placeholder/LoadingPlaceholder';
import getWrapperMeasures from './getWrapperMeasures';

type Props = {
  numberOfColumns: number;
  theme: DefaultTheme;
  index: number;
};

const FamousListItemLoadingPlaceholder = ({ numberOfColumns, index, theme }: Props) => {
  const withMargin = index % numberOfColumns === 1;

  const wrapperMeasures = getWrapperMeasures(withMargin);

  return (
    <LoadingPlaceholder
      style={{ ...wrapperMeasures, borderRadius: metrics.extraSmallSize }}
      colors={theme.colors.loadingColors}
      indexToDelayAnimation={index}
    />
  );
};

export default withTheme(FamousListItemLoadingPlaceholder);
