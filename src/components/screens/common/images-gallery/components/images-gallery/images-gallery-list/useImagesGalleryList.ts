import {useCallback, useEffect, useState, useRef} from 'react';
import {FlatList} from 'react-native';

type UseImagesGalleryListProps = {
  indexImageSelected: number;
  datasetSize: number;
};

export const useImagesGalleryList = (props: UseImagesGalleryListProps) => {
  const [imagesAllowedToBeShown, setImagesAllowedToBeShown] = useState(
    Array(props.datasetSize)
      .fill(false)
      .map((_, index) => index === props.indexImageSelected),
  );

  const imagesGalleryListRef = useRef<FlatList>();

  const moveList = useCallback(() => {
    imagesGalleryListRef.current.scrollToIndex({
      index: props.indexImageSelected,
      animated: true,
    });
  }, [props.indexImageSelected]);

  const handleAllowImageToBeShown = useCallback(() => {
    setImagesAllowedToBeShown((previousImagesAllowedToBeShown: boolean[]) => {
      previousImagesAllowedToBeShown[props.indexImageSelected] = true;
      return previousImagesAllowedToBeShown;
    });
  }, [props.indexImageSelected]);

  useEffect(() => {
    if (
      !props.datasetSize ||
      !imagesGalleryListRef ||
      !imagesGalleryListRef.current
    ) {
      return;
    }
    handleAllowImageToBeShown();
    moveList();
  }, [props.indexImageSelected]);

  return {
    refList: imagesGalleryListRef,
    imagesAllowedToBeShown,
  };
};
