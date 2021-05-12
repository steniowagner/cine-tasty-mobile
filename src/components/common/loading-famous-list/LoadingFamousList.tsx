import React from 'react';
import { FlatList } from 'react-native';

import FamousListItemLoadingPlaceholder from '@components/common/famous-list-item/FamousListItemLoadingPlaceholder';
import metrics from '@styles/metrics';

import useLoadingFamousList from './useLoadingFamousList';

type LoadingFamousListProps = {
  numberOfColumns: number;
};

const LoadingFamousList = (props: LoadingFamousListProps) => {
  const loadingFamousList = useLoadingFamousList({
    numberOfColumns: props.numberOfColumns,
  });

  return (
    <FlatList
      columnWrapperStyle={{
        justifyContent: 'center',
        marginTop: metrics.mediumSize,
      }}
      renderItem={({ index }) => (
        <FamousListItemLoadingPlaceholder
          numberOfColumns={props.numberOfColumns}
          index={index}
        />
      )}
      data={loadingFamousList.famousLoadingListItems}
      numColumns={props.numberOfColumns}
      testID="famous-loading-list"
      keyExtractor={(item) => item}
      scrollEnabled={false}
    />
  );
};

export default LoadingFamousList;
