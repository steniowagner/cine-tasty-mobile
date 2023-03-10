import React from 'react';
import {NativeSyntheticEvent, NativeScrollEvent, FlatList} from 'react-native';

import metrics from '@styles/metrics';

import ImagesGalleryListItem from './images-gallery-list-item/ImagesGalleryListItem';
import {useImagesGalleryList} from './useImagesGalleryList';
import * as Styles from './ImagesGalleryList.styles';

type ImagesGalleryListProps = {
  onFlatlistMomentumScrollEnd: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
  indexImageSelected: number;
  images: string[];
};

export const ImagesGalleryList = (props: ImagesGalleryListProps) => {
  const imagesGalleryList = useImagesGalleryList({
    indexImageSelected: props.indexImageSelected,
    datasetSize: props.images.length,
  });

  return (
    <FlatList
      onMomentumScrollEnd={props.onFlatlistMomentumScrollEnd}
      renderItem={({item, index}) => {
        if (!imagesGalleryList.imagesAllowedToBeShown[index]) {
          return <Styles.PlaceholderListItem testID="placeholder-list-item" />;
        }
        return (
          <ImagesGalleryListItem
            isAllowedToBeShown={props.indexImageSelected === index}
            imageURL={item}
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
      contentContainerStyle={Styles.sheet.flatlist}
      ref={imagesGalleryList.refList}
      keyExtractor={item => item}
      data={props.images}
      testID="images-list"
      bounces={false}
      pagingEnabled
      horizontal
    />
  );
};
