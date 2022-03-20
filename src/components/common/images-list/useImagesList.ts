import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ImagesGalleryNavigationProp} from '@components/screens/shared/images-gallery/routes/route-params-types';
import {Routes} from '@routes/routes';

type UseImagesListProps = {
  images: string[];
};

const useImagesList = (props: UseImagesListProps) => {
  const navigation = useNavigation<ImagesGalleryNavigationProp>();

  const handlePressImage = useCallback(
    (index: number) => {
      navigation.navigate(Routes.ImagesGallery.IMAGES_GALLERY, {
        gallerySize: props.images.length,
        indexSelected: index,
        images: props.images,
      });
    },
    [navigation, props.images],
  );

  return {
    onPressImage: handlePressImage,
  };
};

export default useImagesList;
