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
      showsHorizontalScrollIndicator={false}
      testID="images-list"
      horizontal>
      {props.images.map((image, index) => (
        <ImageListItem
          onPress={() => imagesList.onPressImage(index)}
          orientation={props.orientation}
          image={image}
          key={image}
        />
      ))}
    </Styles.Wrapper>
  );
};
