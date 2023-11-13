import { useCallback, useEffect, useState, useRef } from 'react';
import { FlatList } from 'react-native';

type UseImagesList = {
  indexImageSelected: number;
  gallerySize: number;
};

export const useImagesList = (props: UseImagesList) => {
  const [imagesAllowedToBeShown, setImagesAllowedToBeShown] = useState<
    boolean[]
  >([]);

  const imagesListRef = useRef<FlatList | null>(null);

  const moveList = useCallback(() => {
    imagesListRef?.current?.scrollToIndex({
      index: props.indexImageSelected,
      animated: true,
    });
  }, [props.indexImageSelected]);

  const setImagesVisibility = useCallback(() => {
    setImagesAllowedToBeShown((previousImagesAllowedToBeShown: boolean[]) =>
      previousImagesAllowedToBeShown.map(
        (previousImageAllowedToBeShown, index) =>
          index === props.indexImageSelected
            ? true
            : previousImageAllowedToBeShown,
      ),
    );
  }, [props.indexImageSelected]);

  const updateIndexImageSelected = useCallback(() => {
    if (!props.gallerySize) {
      return;
    }
    setImagesVisibility();
    moveList();
  }, [setImagesVisibility, props.gallerySize, moveList]);

  useEffect(() => {
    updateIndexImageSelected();
  }, [props.indexImageSelected]);

  useEffect(() => {
    setImagesAllowedToBeShown(
      Array(props.gallerySize)
        .fill(false)
        .map((_, index) => index === props.indexImageSelected),
    );
  }, [props.gallerySize]);

  return {
    imagesAllowedToBeShown,
    imagesListRef,
  };
};
