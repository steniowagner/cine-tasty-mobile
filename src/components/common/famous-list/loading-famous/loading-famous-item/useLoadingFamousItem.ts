import {useMemo} from 'react';

import getWrapperMeasures from '../../famous-list-item/getWrapperMeasures';
import {NUMBER_OF_COLUMNS} from '../../FamousList';

type UseLoadingFamousItem = {
  index: number;
};

const useLoadingFamousItem = (props: UseLoadingFamousItem) => {
  const wrapperMeasures = useMemo(() => {
    const withMargin = props.index % NUMBER_OF_COLUMNS === 1;
    return getWrapperMeasures(withMargin);
  }, [props.index]);

  return {
    wrapperMeasures,
  };
};

export default useLoadingFamousItem;
