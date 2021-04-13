import React, { useMemo } from 'react';
import { FlatList } from 'react-native';

import metrics from '@styles/metrics';

import FamousListItemLoadingPlaceholder from '@components/common/famous-list-item/FamousListItemLoadingPlaceholder';
import { DEFAULT_LIST_ITEM_HEIGHT } from '@components/common/famous-list-item/getWrapperMeasures';

export const INITIAL_ITEMS_TO_RENDER = Math.floor(
  metrics.height / DEFAULT_LIST_ITEM_HEIGHT,
);

type Props = {
  numberOfColumns: number;
};

const LoadingFamousList = ({ numberOfColumns }: Props) => {
  const famousLoadingListItems = useMemo(
    () => Array(INITIAL_ITEMS_TO_RENDER * numberOfColumns)
      .fill(0)
      .map((item, index) => `${index}`),
    [numberOfColumns],
  );

  return (
    <FlatList
      columnWrapperStyle={{
        justifyContent: 'center',
        marginTop: metrics.mediumSize,
      }}
      renderItem={({ index }) => (
        <FamousListItemLoadingPlaceholder
          numberOfColumns={numberOfColumns}
          index={index}
        />
      )}
      data={famousLoadingListItems}
      keyExtractor={(item) => item}
      numColumns={numberOfColumns}
      testID="famous-loading-list"
      scrollEnabled={false}
    />
  );
};

export default LoadingFamousList;
