import React, { useCallback, useEffect } from 'react';
import { useTheme } from 'styled-components/native';

import { HeaderTitle, getTransparentHeaderOptions } from '@navigation';
import { HeaderIconButton } from '@common-components';

import { ImagesGalleryProps } from '../routes/route-params-types';
import { useImagesGallery } from './use-images-gallery';
import { ImagesList } from './components/images-list/ImagesList';
import { ThumbsList } from './components/thumbs-list/ThumbsList';
import * as Styles from './ImagesGallery.styles';

export const ImagesGallery = (props: ImagesGalleryProps) => {
  const imagesGallery = useImagesGallery({
    indexSelected: props.route.params.indexSelected,
    images: props.route.params.images,
  });
  const theme = useTheme();

  const HeaderLeft = useCallback(
    () => (
      <HeaderIconButton
        onPress={props.navigation.goBack}
        iconName="arrow-back"
        withMarginLeft
        color="text"
      />
    ),
    [],
  );

  const ImagesGalleryHeaderTitle = useCallback(
    () => (
      <HeaderTitle
        text={`${imagesGallery.indexImageSelected + 1}/${
          imagesGallery.images.length
        }`}
      />
    ),
    [imagesGallery.indexImageSelected, imagesGallery.images],
  );

  useEffect(() => {
    props.navigation.setOptions({
      ...getTransparentHeaderOptions(theme),
      headerTitle: ImagesGalleryHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: HeaderLeft,
    });
  }, [ImagesGalleryHeaderTitle, theme]);

  return (
    <Styles.Wrapper>
      <ImagesList
        onFlatlistMomentumScrollEnd={imagesGallery.onFlatlistMomentumScrollEnd}
        indexImageSelected={imagesGallery.indexImageSelected}
        images={imagesGallery.images}
      />
      <ThumbsList
        onPressThumbListItem={imagesGallery.onPressThumbListItem}
        indexImageSelected={imagesGallery.indexImageSelected}
        thumbs={props.route.params.images}
      />
    </Styles.Wrapper>
  );
};
