import {useLoadListItemImage} from '@hooks';
import {useMemo} from 'react';

import {getFamousListItemMeasures} from '../get-famous-list-item-measures/getFamousListItemMeasures';

type UseFamousListItem = {
  image?: string;
  index: number;
};

export const useFamousListItem = (props: UseFamousListItem) => {
  const loadingListItemImage = useLoadListItemImage({
    image: props.image,
  });

  const measures = useMemo(() => getFamousListItemMeasures(props.index), []);

  return {
    ...loadingListItemImage,
    measures,
  };
};
