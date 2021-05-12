import { useMemo } from 'react';
import { DEFAULT_LIST_ITEM_HEIGHT } from '@components/common/famous-list-item/getWrapperMeasures';

import metrics from '@styles/metrics';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(
  metrics.height / DEFAULT_LIST_ITEM_HEIGHT,
);

type UseLoadingFamousListProps = {
  numberOfColumns: number;
};

const useLoadingFamousList = (props: UseLoadingFamousListProps) => {
  const famousLoadingListItems = useMemo(
    () => Array(INITIAL_ITEMS_TO_RENDER * props.numberOfColumns)
      .fill(0)
      .map((_, index) => `${index}`),
    [props.numberOfColumns],
  );

  return {
    famousLoadingListItems,
  };
};

export default useLoadingFamousList;
