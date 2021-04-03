import { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import metrics from 'styles/metrics';

export const THUMB_SIZE = metrics.getWidthFromDP('24%');
export const THUMB_SPACING = metrics.mediumSize;

type UseThumbsGalleryListProps = {
  indexImageSelected: number;
};

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

  useEffect(() => {
    if (thumbsListRef && thumbsListRef.current) {
      handleMoveThumbsGalleryList();
    }
  }, [indexImageSelected]);

  return {
    thumbsListRef,
  };
};

export default useThumbsGalleryList;
