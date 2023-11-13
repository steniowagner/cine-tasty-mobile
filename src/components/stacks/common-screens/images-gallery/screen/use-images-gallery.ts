import { useCallback, useMemo, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { useTMDBImageURI } from '@hooks';
import metrics from '@styles/metrics';

type UseImageGalleryParams = {
  indexSelected: number;
  images: string[];
};

export const useImagesGallery = (params: UseImageGalleryParams) => {
  const [indexImageSelected, setIndexImageSelected] = useState(
    params.indexSelected,
  );

  const tmdbImageURI = useTMDBImageURI();

  const images = useMemo(
    () =>
      params.images
        .map(image =>
          tmdbImageURI.uri({
            imageType: 'backdrop',
            image,
          }),
        )
        .filter(image => !!image) as string[],
    [params.images, tmdbImageURI.uri],
  );

  const handleFlatlistMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
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
    onPressThumbListItem: setIndexImageSelected,
    indexImageSelected,
    images,
  };
};
