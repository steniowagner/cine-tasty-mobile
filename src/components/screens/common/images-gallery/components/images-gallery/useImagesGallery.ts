import {useCallback, useState} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

import metrics from '@styles/metrics';

type UseImageGalleryProps = {
  indexFirstItemSelected: number;
};

export const useImagesGallery = (props: UseImageGalleryProps) => {
  const [indexImageSelected, setIndexImageSelected] = useState(
    props.indexFirstItemSelected,
  );

  const handleFlatlistMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset} = event.nativeEvent;
      const isHorizontalSwipeMovement = contentOffset.x > 0;
      const currentPageIndex = isHorizontalSwipeMovement
        ? Math.ceil(contentOffset.x / metrics.width)
        : 0;
      setIndexImageSelected(currentPageIndex);
    },
    [],
  );

  return {
    onFlatlistMomentumScrollEnd: handleFlatlistMomentumScrollEnd,
    onPressThumbListItem: (indexSelected: number) =>
      setIndexImageSelected(indexSelected),
    indexImageSelected,
  };
};
