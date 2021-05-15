import { useCallback, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import metrics from '@styles/metrics';

export const THUMB_SIZE = metrics.getWidthFromDP('24%');
export const THUMB_SPACING = metrics.mediumSize;

type UseThumbsGalleryListProps = {
  indexImageSelected: number;
};

const useThumbsGalleryList = (props: UseThumbsGalleryListProps) => {
  const thumbsListRef = useRef<FlatList>();

  const handleMoveThumbsGalleryList = useCallback(() => {
    const isThumbBeyondHalfScreen = props.indexImageSelected * (THUMB_SIZE + THUMB_SPACING)
        - THUMB_SIZE / 2
        - metrics.extraLargeSize
      > metrics.width / 2;

    const middleScreenOffset = props.indexImageSelected * (THUMB_SIZE + THUMB_SPACING)
      + metrics.extraLargeSize
      - (metrics.width / 2 - THUMB_SIZE / 2);

    const offset = isThumbBeyondHalfScreen ? middleScreenOffset : 0;

    thumbsListRef.current.scrollToOffset({
      animated: true,
      offset,
    });
  }, [props.indexImageSelected]);

  useEffect(() => {
    if (thumbsListRef && thumbsListRef.current) {
      handleMoveThumbsGalleryList();
    }
  }, [props.indexImageSelected]);

  return {
    thumbsListRef,
  };
};

export default useThumbsGalleryList;
