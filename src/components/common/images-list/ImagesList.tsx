import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ImagesGalleryNavigationProp } from '@components/screens/shared/images-gallery/routes/route-params-types';
import { Routes } from '@routes/routes';

import ImageListItem from './images-list-item/ImageListItem';

type ImagesListProps = {
  images: string[];
};

const ImagesList = ({ images }: ImagesListProps) => {
  const navigation = useNavigation<ImagesGalleryNavigationProp>();

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ImageListItem
          onPress={() => navigation.navigate(Routes.ImagesGallery.IMAGES_GALLERY, {
            gallerySize: images.length,
            indexSelected: index,
            images,
          })}
          isFirst={index === 0}
          image={item}
        />
      )}
      keyExtractor={(image) => image}
      showsHorizontalScrollIndicator={false}
      testID="images-list"
      data={images}
      horizontal
    />
  );
};

export default ImagesList;
