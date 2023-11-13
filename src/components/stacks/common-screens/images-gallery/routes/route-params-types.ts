import { StackScreenProps } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import { Routes } from '@/navigation';

export type ImagesGalleryProps = StackScreenProps<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Home.IMAGES_GALLERY | Routes.Famous.IMAGES_GALLERY
>;

export type ImagesGalleryNavigationProps = {
  indexSelected: number;
  images: string[];
};
