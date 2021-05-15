import React from 'react';
import { Platform, FlatList } from 'react-native';

import metrics from '@styles/metrics';

import useThumbsGalleryList, { THUMB_SPACING, THUMB_SIZE } from './useThumbsGalleryList';
import ThumbsGalleryListItem from './ThumbsGalleryListItem';

type ThumbsGalleryListProps = {
  onPressBottomListItem: (indexThumbSelected: number) => void;
  indexImageSelected: number;
  thumbs: string[];
};

const ThumbsGalleryList = (props: ThumbsGalleryListProps) => {
  const thumbsGalleryList = useThumbsGalleryList({
    indexImageSelected: props.indexImageSelected,
  });

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ThumbsGalleryListItem
          onPress={() => props.onPressBottomListItem(index)}
          isSelected={props.indexImageSelected === index}
          image={item}
        />
      )}
      style={{
        height: Platform.select({
          ios: metrics.getWidthFromDP('36%'),
          android: metrics.getWidthFromDP('42%'),
        }),
      }}
      contentContainerStyle={{
        paddingHorizontal: metrics.extraLargeSize,
      }}
      getItemLayout={(_data, index) => ({
        offset: (THUMB_SPACING + THUMB_SIZE) * index,
        length: THUMB_SPACING + THUMB_SIZE,
        index,
      })}
      initialScrollIndex={props.indexImageSelected}
      showsHorizontalScrollIndicator={false}
      ref={thumbsGalleryList.thumbsListRef}
      keyExtractor={(item) => item}
      data={props.thumbs}
      testID="thumb-list"
      horizontal
    />
  );
};

export default ThumbsGalleryList;
