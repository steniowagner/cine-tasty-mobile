import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import { Routes } from '@navigation';

type UseImagesListProps = {
  images: string[];
};

type Navigation = StackNavigationProp<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Famous.IMAGES_GALLERY & Routes.Home.IMAGES_GALLERY
>;

export const useImagesList = (props: UseImagesListProps) => {
  const navigation = useNavigation<Navigation>();

  const handlePressImage = useCallback(
    (_index: number) => {
      const routeName = navigation.getState().routes[0].name;
      const isHomeStack = /HOME/gi.test(routeName);
      const imagesGalleryRoute = isHomeStack
        ? Routes.Home.IMAGES_GALLERY
        : Routes.Famous.IMAGES_GALLERY;
      navigation.navigate(imagesGalleryRoute);
    },
    [navigation, props.images],
  );

  return {
    onPressImage: handlePressImage,
  };
};
