import { useMemo } from 'react';

import getWrapperMeasures from './getWrapperMeasures';

type UseFamousListItem = {
  numberOfColumns: number;
  index: number;
};

const useFamousListItem = (props: UseFamousListItem) => {
  const wrapperMeasures = useMemo(() => {
    const withMargin = props.index % props.numberOfColumns === 1;

    return getWrapperMeasures(withMargin);
  }, []);

  return {
    wrapperMeasures,
  };
};

export default useFamousListItem;
