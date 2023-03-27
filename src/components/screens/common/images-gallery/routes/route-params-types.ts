import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {FamousStackParams} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import {checkIsHomeStack} from '@routes/constants';
import {Routes} from '@routes/routes';

type StackParams = FamousStackParams & HomeStackRoutes;

type Route = Routes.Famous.IMAGES_GALLERY | Routes.Home.IMAGES_GALLERY;

export type ImagesGalleryNavigationProp = StackNavigationProp<
  StackParams,
  Route
>;

export type ImagesGalleryRouteProp = RouteProp<StackParams, Route>;

export type ImagesGalleryProps = {
  navigation: ImagesGalleryNavigationProp;
  route: ImagesGalleryRouteProp;
};

export type ImagesGalleryParams = {
  indexSelected: number;
  images: string[];
};

export const getRouteName = (rootParent: string) =>
  checkIsHomeStack(rootParent)
    ? Routes.Home.IMAGES_GALLERY
    : Routes.Famous.IMAGES_GALLERY;
