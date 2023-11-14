import React from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from 'react-native';

import metrics from '@styles/metrics';

import { ImagesListItem } from './images-list-item/ImagesListItem';
import { useImagesList } from './use-images-list';
import * as Styles from './ImagesList.styles';

type ImagesListProps = {
  onFlatlistMomentumScrollEnd: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
  indexImageSelected: number;
  images: string[];
};

export const ImagesList = (props: ImagesListProps) => {
  const imagesList = useImagesList({
    indexImageSelected: props.indexImageSelected,
    gallerySize: props.images.length,
  });

  return (
    <FlatList
      onMomentumScrollEnd={props.onFlatlistMomentumScrollEnd}
      renderItem={({ item, index }) => {
        if (!imagesList.imagesAllowedToBeShown[index]) {
          return <Styles.PlaceholderListItem testID="image-placeholder" />;
        }
        return (
          <ImagesListItem
            isAllowedToBeShown={props.indexImageSelected === index}
            image={item}
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
      ref={imagesList.imagesListRef}
      keyExtractor={item => item}
      data={props.images}
      testID="images-list"
      bounces={false}
      pagingEnabled
      horizontal
    />
  );
};
