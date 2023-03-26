import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  ImagesGalleryNavigationProp,
  getRouteName,
} from '@src/components/screens/common/images-gallery/routes/route-params-types';

type UseImagesListProps = {
  images: string[];
};

export const useImagesList = (props: UseImagesListProps) => {
  const navigation = useNavigation<ImagesGalleryNavigationProp>();

  const handlePressImage = useCallback(
    (index: number) => {
      const route = getRouteName(navigation.getState().routes[0].name);
      navigation.navigate(route, {
        indexSelected: index,
        images: props.images,
      });
    },
    [navigation, props.images],
  );

  return {
    onPressImage: handlePressImage,
    hasImages: props.images && props.images.length,
  };
};
