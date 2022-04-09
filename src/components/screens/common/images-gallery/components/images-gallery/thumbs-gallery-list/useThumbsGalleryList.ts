import {useCallback, useEffect, useRef} from 'react';
import {FlatList} from 'react-native';

import metrics from '@styles/metrics';

import {
  THUMB_TOTAL_SIZE,
  listStyles,
} from './thumbs-gallery-list-item/ThumbsGalleryListItem.styles';

type UseThumbsGalleryListProps = {
  indexImageSelected: number;
};

export const INITIAL_NUMBER_ITEMS_LIST = Math.ceil(
  metrics.width / THUMB_TOTAL_SIZE,
);

const useThumbsGalleryList = (props: UseThumbsGalleryListProps) => {
  const thumbsListRef = useRef<FlatList>();

  const moveList = useCallback(() => {
    const basePixelsToScroll =
      props.indexImageSelected * THUMB_TOTAL_SIZE +
      listStyles.paddingHorizontal;
    const middleOfTheScreen = (metrics.width - THUMB_TOTAL_SIZE) / 2;
    const isThumbBeyondHalfScreen = basePixelsToScroll >= metrics.width / 2;
    const middleScreenOffset = basePixelsToScroll - middleOfTheScreen;
    const offset = isThumbBeyondHalfScreen ? middleScreenOffset : 0;
    thumbsListRef.current.scrollToOffset({
      offset,
      animated: true,
    });
  }, [props.indexImageSelected]);

  const handleMoveThumbsGalleryList = useCallback(() => {
    if (!thumbsListRef || !thumbsListRef.current) {
      return;
    }
    moveList();
  }, [thumbsListRef, moveList]);

  useEffect(() => {
    handleMoveThumbsGalleryList();
  }, [props.indexImageSelected]);

  useEffect(() => {
    setTimeout(() => {
      // for some reason, the flatlist doesn't scroll on the first render immediatly
      handleMoveThumbsGalleryList();
    }, 100);
  }, []);

  return {
    onContentSizeChange: handleMoveThumbsGalleryList,
    thumbsListRef,
  };
};

export default useThumbsGalleryList;
