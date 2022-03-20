import React from 'react';
import {ScrollView} from 'react-native';

import ImageListItem from './images-list-item/ImageListItem';
import useImagesList from './useImagesList';

type ImagesListProps = {
  images: string[];
};

const ImagesList = (props: ImagesListProps) => {
  const imagesList = useImagesList({images: props.images});

  if (!props.images || !props.images.length) {
    return null;
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      testID="images-list"
      horizontal>
      {props.images.map((image, index) => (
        <ImageListItem
          onPress={() => imagesList.onPressImage(index)}
          isFirst={index === 0}
          image={image}
          key={image}
        />
      ))}
    </ScrollView>
  );
};

export default ImagesList;
