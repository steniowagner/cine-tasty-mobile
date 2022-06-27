import React, {useLayoutEffect} from 'react';

import {HeaderIconButton} from '@components';

import {ImagesGalleryList} from './images-gallery-list/ImagesGalleryList';
import {ThumbsGalleryList} from './thumbs-gallery-list/ThumbsGalleryList';
import {ImagesGalleryStackProps} from '../../routes/route-params-types';
import useImageGallery from './useImagesGallery';
import * as Styles from './ImagesGallery.styles';

export const ImagesGallery = (props: ImagesGalleryStackProps) => {
  const imagesGallery = useImageGallery({
    indexFirstItemSelected: props.route.params.indexSelected,
  });
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `${imagesGallery.indexImageSelected + 1}/${
        props.route.params.images.length
      }`,
    });
  }, [imagesGallery.indexImageSelected]);

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
        onFlatlistMomentumScrollEnd={imagesGallery.onFlatlistMomentumScrollEnd}
        indexImageSelected={imagesGallery.indexImageSelected}
        images={props.route.params.images}
      />
      <ThumbsGalleryList
        onPressThumbListItem={imagesGallery.onPressThumbListItem}
        indexImageSelected={imagesGallery.indexImageSelected}
        thumbs={props.route.params.images}
      />
    </Styles.Wrapper>
  );
};
