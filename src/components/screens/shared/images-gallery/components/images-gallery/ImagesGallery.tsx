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

const ImagesGallery = (props: ImagesGalleryStackProps) => {
  const imageGallery = useImageGallery({
    indexFirstItemSelected: props.route.params.indexSelected,
    gallerySize: props.route.params.gallerySize,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `${imageGallery.indexImageSelected + 1}/${props.route.params.gallerySize}`,
    });
  }, [imageGallery.indexImageSelected]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderIconButton
          onPress={() => props.navigation.goBack()}
          iconName="close"
          withMarginLeft
        />
      ),
    });
  }, []);

  return (
    <Styles.Wrapper>
      <ImagesGalleryList
        isIndexesAllowedToRenderImage={imageGallery.isIndexesAllowedToRenderImage}
        onFlatlistMomentumScrollEnd={imageGallery.onFlatlistMomentumScrollEnd}
        indexImageSelected={imageGallery.indexImageSelected}
        images={props.route.params.images}
      />
      <ThumbsGalleryList
        onPressBottomListItem={imageGallery.onPressBottomListItem}
        indexImageSelected={imageGallery.indexImageSelected}
        thumbs={props.route.params.images}
      />
    </Styles.Wrapper>
  );
};

export default ImagesGallery;
