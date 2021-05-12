/* eslint-disable react/display-name */
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@routes/routes';

type ImagesGalleryStackParams = {
  [Routes.ImagesGallery.IMAGES_GALLERY]: ImagesGalleryParams;
};

export type ImagesGalleryParams = {
  indexSelected: number;
  gallerySize: number;
  images: string[];
};

export type ImagesGalleryNavigationProp = StackNavigationProp<
  ImagesGalleryStackParams,
  Routes.ImagesGallery.IMAGES_GALLERY
>;

export type ImagesGalleryStackProps = {
  route: RouteProp<ImagesGalleryStackParams, Routes.ImagesGallery.IMAGES_GALLERY>;
  navigation: ImagesGalleryNavigationProp;
};
