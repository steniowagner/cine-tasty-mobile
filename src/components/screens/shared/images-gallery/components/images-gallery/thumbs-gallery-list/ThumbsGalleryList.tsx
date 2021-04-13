import React from 'react';
import { Platform, FlatList } from 'react-native';

import metrics from '@styles/metrics';

import useThumbsGalleryList, {
  THUMB_SPACING,
  THUMB_SIZE,
} from './use-thumbs-gallery-list';
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
  const { thumbsListRef } = useThumbsGalleryList({ indexImageSelected });

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
      initialScrollIndex={indexImageSelected}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      testID="thumb-list"
      ref={thumbsListRef}
      data={thumbs}
      horizontal
    />
  );
};

export default ThumbsGalleryList;
