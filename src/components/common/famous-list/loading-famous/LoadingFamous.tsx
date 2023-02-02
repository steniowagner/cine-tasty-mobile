import React from 'react';

import {LoadingFamousItem} from './loading-famous-item/LoadingFamousItem';
import {getLoadingFamousItems} from './getLoadingFamousItems';
import * as Styles from './LoadingFamous.styles';

export const LoadingFamous = () => {
  const loadingFamous = getLoadingFamousItems();

  return (
    <Styles.Wrapper testID="famous-loading-list">
      {loadingFamous.map((_, index) => (
        <LoadingFamousItem index={index} key={`${index}`} />
      ))}
    </Styles.Wrapper>
  );
};
