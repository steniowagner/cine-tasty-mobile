import { useEffect, useRef, useCallback } from 'react';
import { FlatList } from 'react-native';

type UseImagesGalleryListProps = {
  indexImageSelected: number;
};

const useImagesGalleryList = ({ indexImageSelected }: UseImagesGalleryListProps) => {
  const galleryListRef = useRef<FlatList>();

  const handleMoveTopList = useCallback(() => {
    galleryListRef.current.scrollToIndex({
      index: indexImageSelected,
      animated: true,
    });
  }, [indexImageSelected]);

  useEffect(() => {
    if (galleryListRef && galleryListRef.current) {
      handleMoveTopList();
    }
  }, [indexImageSelected]);

  return {
    handleMoveTopList,
    galleryListRef,
  };
};

export default useImagesGalleryList;
