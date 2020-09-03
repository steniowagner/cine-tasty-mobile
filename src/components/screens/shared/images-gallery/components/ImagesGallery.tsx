/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ImagesGalleryParams } from 'components/screens/shared/images-gallery/routes/route-params-types';
import HeaderIconButton from 'components/common/HeaderIconButton';

import useImageGallery from './useImagesGallery';

type ImagesGalleryNavigationProp = StackNavigationProp<
  ImagesGalleryParams,
  'IMAGES_GALLERY'
>;

type ImagesGalleryRouteProp = RouteProp<ImagesGalleryParams, 'IMAGES_GALLERY'>;

type Props = {
  navigation: ImagesGalleryNavigationProp;
  route: ImagesGalleryRouteProp;
};

const ImagesGallery = ({ navigation, route }: Props) => {
  const { indexSelectedImage } = useImageGallery(route.params.indexSelected);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${indexSelectedImage + 1}/${route.params.gallerySize}`,
    });
  }, [indexSelectedImage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIconButton
          onPress={() => navigation.goBack()}
          iconName="close"
          withMarginLeft
        />
      ),
    });
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
      }}
    />
  );
};

export default ImagesGallery;
