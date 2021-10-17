import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native';

import metrics from '@styles/metrics';

// @ts-ignore
// eslint-disable-next-line import/extensions
import ImagesGalleryListItem from './images-gallery-list-item/ImagesGalleryListItem';
import useImagesGalleryList from './useImagesGalleryList';
import * as Styles from './ImagesGalleryList.styles';

type ImagesGalleryListProps = {
  onFlatlistMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isIndexesAllowedToRenderImage: boolean[];
  indexImageSelected: number;
  images: string[];
};

const ImagesGalleryList = ({
  isIndexesAllowedToRenderImage,
  onFlatlistMomentumScrollEnd,
  indexImageSelected,
  images,
}: ImagesGalleryListProps) => {
  const { galleryListRef } = useImagesGalleryList({ indexImageSelected });

  return (
    <FlatList
      onMomentumScrollEnd={onFlatlistMomentumScrollEnd}
      renderItem={({ item, index }) => {
        if (isIndexesAllowedToRenderImage[index]) {
          return (
            <ImagesGalleryListItem
              imageURL={item}
            />
          );
        }

        return (
          <Styles.PlaceholderListItem
            testID="placeholder-list-item"
          />
        );
      }}
      initialScrollIndex={indexImageSelected}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_, index) => ({
        offset: metrics.width * index,
        length: metrics.width,
        index,
      })}
      keyExtractor={(item) => item}
      data={images}
      testID="images-list"
      ref={galleryListRef}
      bounces={false}
      pagingEnabled
      horizontal
    />
  );
};

export default ImagesGalleryList;
