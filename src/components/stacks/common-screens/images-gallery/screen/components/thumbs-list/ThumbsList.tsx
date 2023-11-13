import React from 'react';
import { FlatList } from 'react-native';

import { ThumbsListItem } from './thumbs-list-item/ThumbsListItem';
import { THUMB_TOTAL_SIZE } from './thumbs-list-item/ThumbsListItem.styles';
import { useThumbsList } from './use-thumbs-list';
import * as Styles from './ThumbsList.styles';

type ThumbsListProps = {
  onPressThumbListItem: (indexThumbSelected: number) => void;
  indexImageSelected: number;
  thumbs: string[];
};

export const ThumbsList = (props: ThumbsListProps) => {
  const thumbsList = useThumbsList({
    indexImageSelected: props.indexImageSelected,
  });

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ThumbsListItem
          onPress={() => props.onPressThumbListItem(index)}
          isSelected={props.indexImageSelected === index}
          image={item}
        />
      )}
      getItemLayout={(_, index) => ({
        offset: THUMB_TOTAL_SIZE * index,
        length: THUMB_TOTAL_SIZE,
        index,
      })}
      ref={thumbsList.thumbsListRef}
      contentContainerStyle={Styles.sheet.list}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item}
      data={props.thumbs}
      testID="thumbs-list"
      horizontal
    />
  );
};
