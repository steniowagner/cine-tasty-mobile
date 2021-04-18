import React from 'react';

import metrics from '@styles/metrics';

import LoadingPlaceholder from '../loading-placeholder/LoadingPlaceholder';
import getWrapperMeasures from './getWrapperMeasures';

type FamousListItemLoadingPlaceholderProps = {
  numberOfColumns: number;
  index: number;
};

const FamousListItemLoadingPlaceholder = ({
  numberOfColumns,
  index,
}: FamousListItemLoadingPlaceholderProps) => {
  const withMargin = index % numberOfColumns === 1;

  const wrapperMeasures = getWrapperMeasures(withMargin);

  return (
    <LoadingPlaceholder
      style={{ ...wrapperMeasures, borderRadius: metrics.extraSmallSize }}
      indexToDelayAnimation={index}
    />
  );
};

export default FamousListItemLoadingPlaceholder;
