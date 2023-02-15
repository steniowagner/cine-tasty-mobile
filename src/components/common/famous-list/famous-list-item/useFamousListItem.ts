import {useImageFallbackView} from '@hooks';
import {useMemo} from 'react';

import {getFamousListItemMeasures} from '../get-famous-list-item-measures/getFamousListItemMeasures';

type UseFamousListItemProps = {
  image?: string;
  index: number;
};

export const useFamousListItem = (props: UseFamousListItemProps) => {
  const imageFallbackView = useImageFallbackView({
    image: props.image,
  });

  const measures = useMemo(() => getFamousListItemMeasures(props.index), []);

  return {
    ...imageFallbackView,
    measures,
  };
};
