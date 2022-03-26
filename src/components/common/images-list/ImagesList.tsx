import React from 'react';

import {ImageListItem} from './images-list-item/ImageListItem';
import * as Styles from './ImagesList.styles';
import {useImagesList} from './useImagesList';

type ImagesListProps = {
  images: string[];
};

export const ImagesList = (props: ImagesListProps) => {
  const imagesList = useImagesList({images: props.images});

  if (!props.images || !props.images.length) {
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
          image={image}
          key={image}
        />
      ))}
    </Styles.Wrapper>
  );
};
