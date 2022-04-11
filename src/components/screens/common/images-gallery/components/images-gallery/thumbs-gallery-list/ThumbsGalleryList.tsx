import React from 'react';
import {ScrollView} from 'react-native';

import ThumbsGalleryListItem from './thumbs-gallery-list-item/ThumbsGalleryListItem';
import {listStyles} from './thumbs-gallery-list-item/ThumbsGalleryListItem.styles';
import useThumbsGalleryList from './useThumbsGalleryList';

type ThumbsGalleryListProps = {
  onPressThumbListItem: (indexThumbSelected: number) => void;
  indexImageSelected: number;
  thumbs: string[];
};

export const ThumbsGalleryList = (props: ThumbsGalleryListProps) => {
  const thumbsGalleryList = useThumbsGalleryList({
    indexImageSelected: props.indexImageSelected,
  });
  return (
    <ScrollView
      contentContainerStyle={listStyles}
      ref={thumbsGalleryList.thumbsListRef}
      showsHorizontalScrollIndicator={false}
      testID="thumbs-gallery-list"
      horizontal>
      {props.thumbs.map((thumb, index) => (
        <ThumbsGalleryListItem
          onPress={() => props.onPressThumbListItem(index)}
          isSelected={props.indexImageSelected === index}
          image={thumb}
          key={thumb}
        />
      ))}
    </ScrollView>
  );
};
