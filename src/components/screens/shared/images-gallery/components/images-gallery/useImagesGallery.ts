import { useCallback, useState, useMemo } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import metrics from 'styles/metrics';

type State = {
  onFlatlistMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onPressBottomListItem: (index: number) => void;
  isIndexesAllowedToRenderImage: boolean[];
  indexImageSelected: number;
};

type Props = {
  indexFirstItemSelected: number;
  gallerySize: number;
};

const useImageGallery = ({ indexFirstItemSelected, gallerySize }: Props): State => {
  const initialIndexesAllowedToRenderImage = useMemo(
    (): boolean[] => Array(gallerySize)
      .fill(false)
      .map((_, index) => index === indexFirstItemSelected),
    [],
  );

  const [isIndexesAllowedToRenderImage, setIsIndexesAllowedToRenderImage] = useState<
    boolean[]
  >(initialIndexesAllowedToRenderImage);

  const [indexImageSelected, setIndexImageSelected] = useState<number>(
    indexFirstItemSelected,
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
