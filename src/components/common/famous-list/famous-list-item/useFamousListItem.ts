import {useMemo} from 'react';

import {getFamousListItemMeasures} from '../get-famous-list-item-measures/getFamousListItemMeasures';

type UseFamousListItemProps = {
  image?: string;
  index: number;
};

export const useFamousListItem = (props: UseFamousListItemProps) => {
  const measures = useMemo(() => getFamousListItemMeasures(props.index), []);

  return {
    measures,
  };
};
