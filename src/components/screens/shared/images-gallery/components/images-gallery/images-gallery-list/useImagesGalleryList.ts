import { useEffect, useRef, useCallback } from 'react';
import { FlatList } from 'react-native';

type UseImagesGalleryListProps = {
  indexImageSelected: number;
};

const useImagesGalleryList = (props: UseImagesGalleryListProps) => {
  const galleryListRef = useRef<FlatList>();

  const handleMoveTopList = useCallback(() => {
    galleryListRef.current.scrollToIndex({
      index: props.indexImageSelected,
      animated: true,
    });
  }, [props.indexImageSelected]);

  useEffect(() => {
    if (galleryListRef && galleryListRef.current) {
      handleMoveTopList();
    }
  }, [props.indexImageSelected]);

  return {
    handleMoveTopList,
    galleryListRef,
  };
};

export default useImagesGalleryList;
