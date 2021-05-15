import { useCallback, useState, useMemo } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import metrics from '@styles/metrics';

type UseImageGalleryProps = {
  indexFirstItemSelected: number;
  gallerySize: number;
};

const useImageGallery = (props: UseImageGalleryProps) => {
  const initialIndexesAllowedToRenderImage = useMemo(
    (): boolean[] => Array(props.gallerySize)
      .fill(false)
      .map((_, index) => index === props.indexFirstItemSelected),
    [],
  );

  const [isIndexesAllowedToRenderImage, setIsIndexesAllowedToRenderImage] = useState<
    boolean[]
  >(initialIndexesAllowedToRenderImage);

  const [indexImageSelected, setIndexImageSelected] = useState<number>(
    props.indexFirstItemSelected,
  );

  const permitImageAtIndexToRender = useCallback(
    (index: number): void => {
      if (!isIndexesAllowedToRenderImage[index]) {
        setIsIndexesAllowedToRenderImage(
          (previousIndexesAllowedToRenderImage: boolean[]): boolean[] => previousIndexesAllowedToRenderImage.map(
            (previousIndexAllowedToRenderImage, currentIndex) => {
              if (currentIndex === index) {
                return true;
              }

              return previousIndexAllowedToRenderImage;
            },
          ),
        );
      }
    },
    [isIndexesAllowedToRenderImage],
  );

  const onFlatlistMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
      const { contentOffset } = event.nativeEvent;

      const isHorizontalSwipeMovement = contentOffset.x > 0;

      const currentPageIndex = isHorizontalSwipeMovement
        ? Math.ceil(contentOffset.x / metrics.width)
        : 0;

      permitImageAtIndexToRender(currentPageIndex);

      setIndexImageSelected(currentPageIndex);
    },
    [],
  );

  const onPressBottomListItem = useCallback((indexSelected: number) => {
    permitImageAtIndexToRender(indexSelected);

    setIndexImageSelected(indexSelected);
  }, []);

  return {
    isIndexesAllowedToRenderImage,
    onFlatlistMomentumScrollEnd,
    onPressBottomListItem,
    indexImageSelected,
  };
};

export default useImageGallery;
