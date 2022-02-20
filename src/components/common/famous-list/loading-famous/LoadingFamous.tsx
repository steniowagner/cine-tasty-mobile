import React from 'react';

import LoadingFamousItem from './loading-famous-item/LoadingFamousItem';

import useLoadingFamous from './useLoadingFamous';
import * as Styles from './LoadingFamous.styles';

const LoadingFamousList = () => {
  const loadingFamous = useLoadingFamous();
  return (
    <Styles.Wrapper testID="famous-loading-list">
      {loadingFamous.list.map((_, index) => (
        <LoadingFamousItem index={index} key={`${index}`} />
      ))}
    </Styles.Wrapper>
  );
};

export default LoadingFamousList;
