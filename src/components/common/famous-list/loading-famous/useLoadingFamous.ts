import {useMemo} from 'react';

import {DEFAULT_LIST_ITEM_HEIGHT} from '@components/common/famous-list/famous-list-item/getWrapperMeasures';
import {NUMBER_OF_COLUMNS} from '../FamousList';
import metrics from '@styles/metrics';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(
  metrics.height / DEFAULT_LIST_ITEM_HEIGHT,
);

const useLoadingFamous = () => {
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

export default useLoadingFamous;
