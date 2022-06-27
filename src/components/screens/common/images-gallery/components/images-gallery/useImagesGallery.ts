import {useCallback, useState} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

import metrics from '@styles/metrics';

type UseImageGalleryProps = {
  indexFirstItemSelected: number;
};

const useImageGallery = (props: UseImageGalleryProps) => {
  const [indexImageSelected, setIndexImageSelected] = useState(
    props.indexFirstItemSelected,
  );

  const onFlatlistMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
      const {contentOffset} = event.nativeEvent;
      const isHorizontalSwipeMovement = contentOffset.x > 0;
      const currentPageIndex = isHorizontalSwipeMovement
        ? Math.ceil(contentOffset.x / metrics.width)
        : 0;
      setIndexImageSelected(currentPageIndex);
    },
    [],
  );

  const onPressThumbListItem = useCallback((indexSelected: number) => {
    setIndexImageSelected(indexSelected);
  }, []);

  return {
    onFlatlistMomentumScrollEnd,
    onPressThumbListItem,
    indexImageSelected,
  };
};

export default useImageGallery;
