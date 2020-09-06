/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import { ImagesGalleryParams } from 'components/screens/shared/images-gallery/routes/route-params-types';
import HeaderIconButton from 'components/common/HeaderIconButton';
import metrics from 'styles/metrics';

import ImagesGalleryListItem from './images-gallery-list-item/ImagesGalleryListItem';
import useImageGallery from './useImagesGallery';

const PlaceholderListItem = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CustomActivityIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
  size: 'large',
}))`
  align-self: center;
`;

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
    indexSelectedImage,
  } = useImageGallery({
    indexFirstItemSelected: route.params.indexSelected,
    gallerySize: route.params.gallerySize,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${indexSelectedImage + 1}/${route.params.gallerySize}`,
    });
  }, [indexSelectedImage]);

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
    <FlatList
      onMomentumScrollEnd={onFlatlistMomentumScrollEnd}
      contentContainerStyle={{
        justifyContent: 'center',
      }}
      renderItem={({ item, index }) => {
        if (isIndexesAllowedToRenderImage[index]) {
          return (
            <ImagesGalleryListItem
              isAllowedToRender
              imageURL={item}
            />
          );
        }

        return (
          <PlaceholderListItem
            testID="placeholder-list-item"
          >
            <CustomActivityIndicator />
          </PlaceholderListItem>
        );
      }}
      initialScrollIndex={route.params.indexSelected}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        offset: metrics.width * index,
        length: metrics.width,
        index,
      })}
      keyExtractor={(item) => item}
      data={route.params.images}
      testID="images-list"
      bounces={false}
      pagingEnabled
      horizontal
    />
  );
};

export default ImagesGallery;
