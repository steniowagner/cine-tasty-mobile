import React from 'react';
import { FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { ImagesGalleryParams } from '@components/screens/shared/images-gallery/routes/route-params-types';

import ImageListItem from './images-list-item/ImageListItem';

type ImageGalleryNavigationProp = StackNavigationProp<
  ImagesGalleryParams,
  'IMAGES_GALLERY'
>;

type Props = {
  images: string[];
};

const ImagesList = ({ images }: Props) => {
  const navigation = useNavigation<ImageGalleryNavigationProp>();

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <ImageListItem
          onPress={() => navigation.navigate('IMAGES_GALLERY', {
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
