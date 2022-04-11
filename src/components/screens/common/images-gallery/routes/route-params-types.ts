import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {Routes} from '@routes/routes';

type ImagesGalleryStackParams = {
  [Routes.ImagesGallery.IMAGES_GALLERY]: ImagesGalleryParams;
};

type ImagesGalleryParams = {
  indexSelected: number;
  images: string[];
};

/** Images-Gallery-Stack-Props */
export type ImagesGalleryNavigationProp = StackNavigationProp<
  ImagesGalleryStackParams,
  Routes.ImagesGallery.IMAGES_GALLERY
>;

export type ImagesGalleryRouteProp = RouteProp<
  ImagesGalleryStackParams,
  Routes.ImagesGallery.IMAGES_GALLERY
>;

export type ImagesGalleryStackProps = {
  navigation: ImagesGalleryNavigationProp;
  route: ImagesGalleryRouteProp;
};
