import {useMemo} from 'react';

import metrics from '@styles/metrics';

import {DEFAULT_LIST_ITEM_HEIGHT} from '../FamousList.styles';
import {NUMBER_OF_COLUMNS} from '../FamousList';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(
  metrics.height / DEFAULT_LIST_ITEM_HEIGHT,
);

export const useLoadingFamous = () => {
  const list = useMemo(
    () =>
      Array(INITIAL_ITEMS_TO_RENDER * NUMBER_OF_COLUMNS)
        .fill(0)
        .map((_, index) => `${index}`),
    [],
  );

  return {
    list,
  };
};
