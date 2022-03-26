import React from 'react';
import {Platform, FlatList} from 'react-native';

import {
  PaginationFooter,
  FullMediaListItem,
  PopupAdvice,
} from '@components/common';

import {MediaSectionViewAllStackProps} from '../../routes/route-params-types';
import useMediaSectionViewAll from './useMediaSectionViewAll';

const MediaSectionViewAll = ({
  navigation,
  route,
}: MediaSectionViewAllStackProps) => {
  const {
    shouldShowListBottomReloadButton,
    onPressBottomReloadButton,
    hasPaginationError,
    onEndReached,
    isPaginating,
    onPressItem,
    dataset,
    error,
  } = useMediaSectionViewAll({
    initialMediaItems: route.params.initialDataset,
    trendingMediaItemKey: route.params.sectionKey,
    isMovie: route.params.isMovie,
    navigation,
  });

  return (
    <>
      <FlatList
        ListFooterComponent={() =>
          shouldShowListBottomReloadButton && (
            <PaginationFooter
              onPressReloadButton={onPressBottomReloadButton}
              hasError={hasPaginationError}
              isPaginating={isPaginating}
            />
          )
        }
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        renderItem={({item}) => (
          <FullMediaListItem
            onPressDetails={() => onPressItem(item)}
            voteCount={item.voteCount}
            votes={item.voteAverage}
            image={item.posterPath}
            genres={item.genreIds}
            title={item.title}
          />
        )}
        keyExtractor={({id}, index) => `${id}-${index}`}
        testID="media-view-all-list"
        onEndReached={onEndReached}
        data={dataset}
      />
      {!!error && <PopupAdvice text={error} />}
    </>
  );
};

export default MediaSectionViewAll;
