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

const ImagesGalleryList = (props: ImagesGalleryListProps) => {
  const imagesGalleryList = useImagesGalleryList({
    indexImageSelected: props.indexImageSelected,
  });

  return (
    <FlatList
      onMomentumScrollEnd={props.onFlatlistMomentumScrollEnd}
      renderItem={({ item, index }) => {
        if (props.isIndexesAllowedToRenderImage[index]) {
          return (
            <ImagesGalleryListItem
              isFocused={props.indexImageSelected === index}
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
      initialScrollIndex={props.indexImageSelected}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_, index) => ({
        offset: metrics.width * index,
        length: metrics.width,
        index,
      })}
      ref={imagesGalleryList.galleryListRef}
      keyExtractor={(item) => item}
      data={props.images}
      testID="images-list"
      bounces={false}
      pagingEnabled
      horizontal
    />
  );
};

export default ImagesGalleryList;
