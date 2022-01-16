import {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { Platform, FlatList } from 'react-native';

import metrics from '@styles/metrics';

import { THUMB_SPACING, THUMB_SIZE } from './ThumbsGalleryListItem.styles';

type UseThumbsGalleryListProps = {
  indexImageSelected: number;
};

export const INITIAL_NUMBER_ITEMS_LIST = Math.ceil(metrics.width / THUMB_SIZE);

const useThumbsGalleryList = ({ indexImageSelected }: UseThumbsGalleryListProps) => {
  const thumbsListRef = useRef<FlatList>();

  const handleMoveThumbsGalleryList = useCallback(() => {
    const isThumbBeyondHalfScreen = indexImageSelected * (THUMB_SIZE + THUMB_SPACING)
        - THUMB_SIZE / 2
        - metrics.extraLargeSize
      > metrics.width / 2;

    const middleScreenOffset = indexImageSelected * (THUMB_SIZE + THUMB_SPACING)
      + metrics.extraLargeSize
      - (metrics.width / 2 - THUMB_SIZE / 2);

    const offset = isThumbBeyondHalfScreen ? middleScreenOffset : 0;

    thumbsListRef.current.scrollToOffset({
      animated: true,
      offset,
    });
  }, [indexImageSelected]);

  const moveThumbGalleryList = useCallback(() => {
    if (thumbsListRef && thumbsListRef.current) {
      handleMoveThumbsGalleryList();
    }
  }, [thumbsListRef, handleMoveThumbsGalleryList]);

  useEffect(() => {
    moveThumbGalleryList();
  }, [indexImageSelected]);

  const listStyle = useMemo(
    () => ({
      height: Platform.select({
        android: metrics.getWidthFromDP('42%'),
        ios: metrics.getWidthFromDP('36%'),
      }),
    }),
    [],
  );

  return {
    onContentSizeChange: moveThumbGalleryList,
    thumbsListRef,
    listStyle,
  };
};

export default useThumbsGalleryList;
