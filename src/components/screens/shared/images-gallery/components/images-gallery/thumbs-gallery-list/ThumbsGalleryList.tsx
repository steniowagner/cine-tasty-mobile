import React, { useCallback, useEffect, useRef } from 'react';
import { Platform, FlatList } from 'react-native';

import metrics from 'styles/metrics';

import ThumbsGalleryListItem from './ThumbsGalleryListItem';

const THUMB_SIZE = metrics.getWidthFromDP('24%');
const THUMB_SPACING = metrics.mediumSize;

type Props = {
  onPressBottomListItem: (indexThumbSelected: number) => void;
  indexImageSelected: number;
  thumbs: string[];
};

const ThumbsGalleryList = ({
  onPressBottomListItem,
  indexImageSelected,
  thumbs,
}: Props) => {
  const bottomListRef = useRef<FlatList>();

  const handleMoveBottomList = useCallback(() => {
    const isThumbBeyondHalfScreen = indexImageSelected * (THUMB_SIZE + THUMB_SPACING)
        - THUMB_SIZE / 2
        - metrics.extraLargeSize
      > metrics.width / 2;

    const middleScreenOffset = indexImageSelected * (THUMB_SIZE + THUMB_SPACING)
      + metrics.extraLargeSize
      - (metrics.width / 2 - THUMB_SIZE / 2);

    const offset = isThumbBeyondHalfScreen ? middleScreenOffset : 0;

    bottomListRef.current.scrollToOffset({
      animated: true,
      offset,
    });
  }, [indexImageSelected]);

  useEffect(() => {
    if (bottomListRef && bottomListRef.current) {
      handleMoveBottomList();
    }
  }, [indexImageSelected]);

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ThumbsGalleryListItem
          onPress={() => onPressBottomListItem(index)}
          isSelected={indexImageSelected === index}
          image={item}
        />
      )}
      style={{
        bottom: Platform.select({
          android: metrics.getWidthFromDP('14%'),
          ios: metrics.getWidthFromDP('18%'),
        }),
        position: 'absolute',
      }}
      contentContainerStyle={{
        paddingHorizontal: metrics.extraLargeSize,
      }}
      initialScrollIndex={indexImageSelected}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      testID="thumb-list"
      ref={bottomListRef}
      data={thumbs}
      horizontal
    />
  );
};

export default ThumbsGalleryList;
