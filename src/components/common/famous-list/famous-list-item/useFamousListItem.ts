import {useLoadListItemImage} from '@hooks';

import useFamousListItemMeasures from '../useFamousListItemMeasures';

type UseFamousListItem = {
  image?: string;
  index: number;
};

const useFamousListItem = (props: UseFamousListItem) => {
  const loadingListItemImage = useLoadListItemImage({
    image: props.image,
  });

  const famousListItemMeasures = useFamousListItemMeasures({
    index: props.index,
  });

  return {
    ...loadingListItemImage,
    measures: famousListItemMeasures.measures,
  };
};

export default useFamousListItem;
