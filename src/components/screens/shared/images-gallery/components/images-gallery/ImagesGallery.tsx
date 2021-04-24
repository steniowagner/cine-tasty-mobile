/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';

import { ImagesGalleryStackProps } from '@components/screens/shared/images-gallery/routes/route-params-types';
import HeaderIconButton from '@components/common/header-icon-button/HeaderIconButton';

// @ts-ignore
// eslint-disable-next-line import/extensions
import ImagesGalleryList from './images-gallery-list/ImagesGalleryList';
import ThumbsGalleryList from './thumbs-gallery-list/ThumbsGalleryList';
import useImageGallery from './useImagesGallery';
import * as Styles from './ImagesGallery.styles';

const ImagesGallery = ({ navigation, route }: ImagesGalleryStackProps) => {
  const {
    isIndexesAllowedToRenderImage,
    onFlatlistMomentumScrollEnd,
    onPressBottomListItem,
    indexImageSelected,
  } = useImageGallery({
    indexFirstItemSelected: route.params.indexSelected,
    gallerySize: route.params.gallerySize,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${indexImageSelected + 1}/${route.params.gallerySize}`,
    });
  }, [indexImageSelected]);

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
    <Styles.Wrapper>
      <ImagesGalleryList
        isIndexesAllowedToRenderImage={isIndexesAllowedToRenderImage}
        onFlatlistMomentumScrollEnd={onFlatlistMomentumScrollEnd}
        indexImageSelected={indexImageSelected}
        images={route.params.images}
      />
      <ThumbsGalleryList
        onPressBottomListItem={onPressBottomListItem}
        indexImageSelected={indexImageSelected}
        thumbs={route.params.images}
      />
    </Styles.Wrapper>
  );
};

export default ImagesGallery;
