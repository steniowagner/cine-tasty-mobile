/* eslint-disable react/display-name */
import React, { useEffect, useRef, useCallback } from 'react';
import {
  NativeSyntheticEvent, NativeScrollEvent, FlatList, View,
} from 'react-native';
import styled from 'styled-components';

import metrics from 'styles/metrics';

// @ts-ignore
// eslint-disable-next-line import/extensions
import ImagesGalleryListItem from './images-gallery-list-item/ImagesGalleryListItem';

const PlaceholderListItem = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
`;

type Props = {
  onFlatlistMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isIndexesAllowedToRenderImage: boolean[];
  indexImageSelected: number;
  images: string[];
};

const ImagesGalleryList = ({
  isIndexesAllowedToRenderImage,
  onFlatlistMomentumScrollEnd,
  indexImageSelected,
  images,
}: Props) => {
  const topListRef = useRef<FlatList>();

  const handleMoveTopList = useCallback(() => {
    topListRef.current.scrollToIndex({
      index: indexImageSelected,
      animated: true,
    });
  }, [indexImageSelected]);

  useEffect(() => {
    if (topListRef && topListRef.current) {
      handleMoveTopList();
    }
  }, [indexImageSelected]);

  return (
    <FlatList
      onMomentumScrollEnd={onFlatlistMomentumScrollEnd}
      renderItem={({ item, index }) => {
        if (isIndexesAllowedToRenderImage[index]) {
          return (
            <ImagesGalleryListItem
              isFocused={indexImageSelected === index}
              imageURL={item}
            />
          );
        }

        return (
          <PlaceholderListItem
            testID="placeholder-list-item"
          />
        );
      }}
      initialScrollIndex={indexImageSelected}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_, index) => ({
        offset: metrics.width * index,
        length: metrics.width,
        index,
      })}
      keyExtractor={(item) => item}
      data={images}
      testID="images-list"
      ref={topListRef}
      bounces={false}
      pagingEnabled
      horizontal
    />
  );
};

export default ImagesGalleryList;
