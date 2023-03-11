import {useCallback, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';

import metrics from '@styles/metrics';

import * as ThumbsGalleryListItemStyles from './thumbs-gallery-list-item/ThumbsGalleryListItem.styles';
import * as Styles from './ThumbsGalleryList.styles';

type UseThumbsGalleryListProps = {
  indexImageSelected: number;
};

export const INITIAL_NUMBER_ITEMS_LIST = Math.ceil(
  metrics.width / ThumbsGalleryListItemStyles.THUMB_TOTAL_SIZE,
);

export const useThumbsGalleryList = (props: UseThumbsGalleryListProps) => {
  const thumbsListRef = useRef<ScrollView>();

  const moveList = useCallback(() => {
    const basePixelsToScroll =
      props.indexImageSelected * ThumbsGalleryListItemStyles.THUMB_TOTAL_SIZE +
      Styles.sheet.list.paddingHorizontal;
    const middleOfTheScreen =
      (metrics.width - ThumbsGalleryListItemStyles.THUMB_TOTAL_SIZE) / 2;
    const isThumbBeyondHalfScreen = basePixelsToScroll >= metrics.width / 2;
    const middleScreenOffset = basePixelsToScroll - middleOfTheScreen;
    const offset = isThumbBeyondHalfScreen ? middleScreenOffset : 0;
    thumbsListRef.current.scrollTo({
      animated: true,
      x: offset,
      y: 0,
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
      // for some reason, the ScrollView doesn't scroll properly on the first render
      handleMoveThumbsGalleryList();
    }, 0);
  }, []);

  return {
    onContentSizeChange: handleMoveThumbsGalleryList,
    thumbsListRef,
  };
};
