/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ImagesGalleryParams } from 'components/screens/shared/images-gallery/routes/route-params-types';
import HeaderIconButton from 'components/common/HeaderIconButton';

// @ts-ignore
// eslint-disable-next-line import/extensions
import ImagesGalleryList from './images-gallery-list/ImagesGalleryList';
import ThumbsGalleryList from './thumbs-gallery-list/ThumbsGalleryList';
import useImageGallery from './use-images-gallery';
import * as S from './images-gallery-styles';

type ImagesGalleryNavigationProp = StackNavigationProp<
  ImagesGalleryParams,
  'IMAGES_GALLERY'
>;

type ImagesGalleryRouteProp = RouteProp<ImagesGalleryParams, 'IMAGES_GALLERY'>;

type Props = {
  navigation: ImagesGalleryNavigationProp;
  route: ImagesGalleryRouteProp;
};

const ImagesGallery = ({ navigation, route }: Props) => {
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
    <S.Wrapper>
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
    </S.Wrapper>
  );
};

export default ImagesGallery;
