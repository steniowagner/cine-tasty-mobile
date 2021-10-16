import React from 'react';
import { FlatList } from 'react-native';

import metrics from '@styles/metrics';

import useThumbsGalleryList, { INITIAL_NUMBER_ITEMS_LIST } from './useThumbsGalleryList';
import { THUMB_SPACING, THUMB_SIZE } from './ThumbsGalleryListItem.styles';
import ThumbsGalleryListItem from './ThumbsGalleryListItem';

type ThumbsGalleryListProps = {
  onPressBottomListItem: (indexThumbSelected: number) => void;
  indexImageSelected: number;
  thumbs: string[];
};

const ThumbsGalleryList = ({
  onPressBottomListItem,
  indexImageSelected,
  thumbs,
}: ThumbsGalleryListProps) => {
  const { thumbsListRef, listStyle } = useThumbsGalleryList({
    indexImageSelected,
  });

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ThumbsGalleryListItem
          onPress={() => onPressBottomListItem(index)}
          isSelected={indexImageSelected === index}
          image={item}
        />
      )}
      contentContainerStyle={{
        paddingHorizontal: metrics.extraLargeSize,
      }}
      getItemLayout={(_data, index) => ({
        offset: (THUMB_SPACING + THUMB_SIZE) * index,
        length: THUMB_SPACING + THUMB_SIZE,
        index,
      })}
      initialNumToRender={INITIAL_NUMBER_ITEMS_LIST}
      initialScrollIndex={indexImageSelected}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      testID="thumb-list"
      ref={thumbsListRef}
      style={listStyle}
      data={thumbs}
      horizontal
    />
  );
};

export default ThumbsGalleryList;
