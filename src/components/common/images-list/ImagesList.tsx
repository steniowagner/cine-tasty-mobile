import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ImagesGalleryNavigationProp } from '@components/screens/shared/images-gallery/routes/route-params-types';
import { Routes } from '@routes/routes';

import ImageListItem from './images-list-item/ImageListItem';

type ImagesListProps = {
  images: string[];
};

const ImagesList = (props: ImagesListProps) => {
  const navigation = useNavigation<ImagesGalleryNavigationProp>();

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ImageListItem
          onPress={() => navigation.navigate(Routes.ImagesGallery.IMAGES_GALLERY, {
            gallerySize: props.images.length,
            indexSelected: index,
            images: props.images,
          })}
          isFirst={index === 0}
          image={item}
        />
      )}
      keyExtractor={(image) => image}
      showsHorizontalScrollIndicator={false}
      testID="images-list"
      data={props.images}
      horizontal
    />
  );
};

export default ImagesList;
