import React from 'react';

import metrics from '@styles/metrics';

import LoadingPlaceholder from '../../../loading-placeholder/LoadingPlaceholder';
import useLoadingFamousItem from './useLoadingFamousItem';

type LoadingFamousItemProps = {
  index: number;
};

const LoadingFamousItem = (props: LoadingFamousItemProps) => {
  const loadingFamousItem = useLoadingFamousItem(props);
  return (
    <LoadingPlaceholder
      style={{
        ...loadingFamousItem.wrapperMeasures,
        borderRadius: metrics.extraSmallSize,
      }}
      indexToDelayAnimation={props.index}
    />
  );
};

export default LoadingFamousItem;
