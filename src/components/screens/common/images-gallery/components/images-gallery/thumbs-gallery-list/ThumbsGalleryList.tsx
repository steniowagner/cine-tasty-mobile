import React from 'react';
import {ScrollView} from 'react-native';

import ThumbsGalleryListItem from './thumbs-gallery-list-item/ThumbsGalleryListItem';
import {useThumbsGalleryList} from './useThumbsGalleryList';
import * as Styles from './ThumbsGalleryList.styles';

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
      contentContainerStyle={Styles.sheet.list}
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
