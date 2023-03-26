import React, {useEffect} from 'react';

import {HeaderIconButton} from '@components';

import {ImagesGalleryList} from './images-gallery-list/ImagesGalleryList';
import {ThumbsGalleryList} from './thumbs-gallery-list/ThumbsGalleryList';
import {ImagesGalleryProps} from '../../routes/route-params-types';
import {useImagesGallery} from './useImagesGallery';
import * as Styles from './ImagesGallery.styles';

export const ImagesGallery = (props: ImagesGalleryProps) => {
  const imagesGallery = useImagesGallery({
    indexFirstItemSelected: props.route.params.indexSelected,
  });

  useEffect(() => {
    props.navigation.setOptions({
      title: `${imagesGallery.indexImageSelected + 1}/${
        props.route.params.images.length
      }`,
      headerLeft: () => (
        <HeaderIconButton
          onPress={() => props.navigation.goBack()}
          iconName="close"
          withMarginLeft
        />
      ),
    });
  }, [imagesGallery.indexImageSelected]);

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
