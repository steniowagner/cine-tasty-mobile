import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native';

import metrics from '@styles/metrics';

// @ts-ignore
// eslint-disable-next-line import/extensions
import ImagesGalleryListItem from './images-gallery-list-item/ImagesGalleryListItem';
import useImagesGalleryList from './use-images-gallery-list';
import * as S from './images-gallery-list-styles';

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
              isFocused={indexImageSelected === index}
              imageURL={item}
            />
          );
        }

        return (
          <S.PlaceholderListItem
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
