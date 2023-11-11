import React from 'react';

import { ImageOrientation } from './images-list-item/ImageListItem.styles';
import { ImageListItem } from './images-list-item/ImageListItem';
import * as Styles from './ImagesList.styles';
import { useImagesList } from './use-images-list';

type ImagesListProps = ImageOrientation & {
  images: string[];
};

export const ImagesList = (props: ImagesListProps) => {
  const imagesList = useImagesList({ images: props.images });

  if (!props.images.length) {
    return null;
  }

  return (
    <Styles.Wrapper
      renderItem={({ item, index }) => (
        <ImageListItem
          onPress={() => imagesList.onPressImage(index)}
          orientation={props.orientation}
          image={item}
          key={item}
        />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item}
      horizontal
      data={props.images}
      testID="images-list"
    />
  );
};
