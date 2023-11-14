import { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import metrics from '@/styles/metrics';

import { THUMB_TOTAL_SIZE } from './thumbs-list-item/ThumbsListItem.styles';
import * as Styles from './ThumbsList.styles';

type UseThumbsListProps = {
  indexImageSelected: number;
};

export const useThumbsList = (props: UseThumbsListProps) => {
  const thumbsListRef = useRef<FlatList | null>(null);

  const moveList = useCallback(() => {
    const basePixelsToScroll =
      props.indexImageSelected * THUMB_TOTAL_SIZE +
      Styles.sheet.list.paddingHorizontal;
    const middleOfTheScreen = (metrics.width - THUMB_TOTAL_SIZE) / 2;
    const isThumbBeyondHalfScreen = basePixelsToScroll >= metrics.width / 2;
    const middleScreenOffset = basePixelsToScroll - middleOfTheScreen;
    const offset = isThumbBeyondHalfScreen ? middleScreenOffset : 0;
    thumbsListRef?.current?.scrollToOffset({
      animated: true,
      offset,
    });
  }, [props.indexImageSelected]);

  const handleMoveThumbsGalleryList = useCallback(() => {
    const isThumbsListRefSet = thumbsListRef && thumbsListRef.current;
    if (!isThumbsListRefSet) {
      return;
    }
    moveList();
  }, [thumbsListRef, moveList]);

  useEffect(() => {
    handleMoveThumbsGalleryList();
  }, [props.indexImageSelected]);

  useEffect(() => {
    setTimeout(() => {
      // for some reason, the FlatList doesn't scroll properly on the first render
      handleMoveThumbsGalleryList();
    }, 0);
  }, []);

  return {
    thumbsListRef,
  };
};
