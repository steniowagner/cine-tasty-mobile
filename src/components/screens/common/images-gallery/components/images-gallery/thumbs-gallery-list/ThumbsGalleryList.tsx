import React from 'react';
import {FlatList} from 'react-native';

import {
  THUMB_TOTAL_SIZE,
  listStyles,
} from './thumbs-gallery-list-item/ThumbsGalleryListItem.styles';
import ThumbsGalleryListItem from './thumbs-gallery-list-item/ThumbsGalleryListItem';
import useThumbsGalleryList from './useThumbsGalleryList';

type ThumbsGalleryListProps = {
  onPressBottomListItem: (indexThumbSelected: number) => void;
  indexImageSelected: number;
  thumbs: string[];
};

export const ThumbsGalleryList = (props: ThumbsGalleryListProps) => {
  const thumbsGalleryList = useThumbsGalleryList({
    indexImageSelected: props.indexImageSelected,
  });
  return (
    <FlatList
      renderItem={({item, index}) => (
        <ThumbsGalleryListItem
          onPress={() => props.onPressBottomListItem(index)}
          isSelected={props.indexImageSelected === index}
          image={item}
        />
      )}
      getItemLayout={(_data, index) => ({
        offset: THUMB_TOTAL_SIZE * index,
        length: THUMB_TOTAL_SIZE,
        index,
      })}
      initialScrollIndex={props.indexImageSelected}
      showsHorizontalScrollIndicator={false}
      ref={thumbsGalleryList.thumbsListRef}
      contentContainerStyle={listStyles}
      keyExtractor={item => item}
      testID="thumb-list"
      data={props.thumbs}
      horizontal
    />
  );
};
