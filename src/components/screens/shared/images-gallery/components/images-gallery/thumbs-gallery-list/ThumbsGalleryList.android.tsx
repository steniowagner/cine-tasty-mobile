import React from 'react';
import { FlatList } from 'react-native';

import metrics from '@styles/metrics';

import useThumbsGalleryList, { INITIAL_NUMBER_ITEMS_LIST } from './useThumbsGalleryList';
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
  const { onContentSizeChange, thumbsListRef, listStyle } = useThumbsGalleryList({
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
      onContentSizeChange={onContentSizeChange}
      initialNumToRender={INITIAL_NUMBER_ITEMS_LIST}
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
