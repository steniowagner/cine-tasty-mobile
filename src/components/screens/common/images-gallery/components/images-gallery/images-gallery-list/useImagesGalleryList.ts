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

  const handleSetImagesAllowedToBeShown = useCallback(() => {
    setImagesAllowedToBeShown((previousImagesAllowedToBeShown: boolean[]) =>
      previousImagesAllowedToBeShown.map(
        (previousImageAllowedToBeShown, index) =>
          index === props.indexImageSelected
            ? true
            : previousImageAllowedToBeShown,
      ),
    );
  }, [props.indexImageSelected]);

  const handleUpdateIndexImageSelected = useCallback(() => {
    const isImagesGalleryListRefInitialized =
      imagesGalleryListRef && imagesGalleryListRef.current;
    if (!isImagesGalleryListRefInitialized || !props.datasetSize) {
      return;
    }
    handleSetImagesAllowedToBeShown();
    moveList();
  }, [handleSetImagesAllowedToBeShown, moveList]);

  useEffect(() => {
    handleUpdateIndexImageSelected();
  }, [props.indexImageSelected]);

  return {
    refList: imagesGalleryListRef,
    imagesAllowedToBeShown,
  };
};
