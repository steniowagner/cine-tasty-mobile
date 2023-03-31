import React from 'react';
import {Platform, FlatList} from 'react-native';

import {PaginationFooter, FullMediaListItem} from '@components';

import {MediaSectionViewAllProps} from '../routes/route-params-types';
import {useMediaSectionViewAll} from './useMediaSectionViewAll';

export const MediaSectionViewAll = (props: MediaSectionViewAllProps) => {
  const mediaSectionViewAll = useMediaSectionViewAll({
    initialMediaItems: props.route.params.initialDataset,
    trendingMediaItemKey: props.route.params.sectionKey,
    isMovie: props.route.params.isMovie,
    navigation: props.navigation,
  });

  return (
    <>
      <FlatList
        ListFooterComponent={() =>
          mediaSectionViewAll.shouldShowListBottomReloadButton && (
            <PaginationFooter
              onPressReloadButton={
                mediaSectionViewAll.onPressBottomReloadButton
              }
              hasError={mediaSectionViewAll.hasPaginationError}
              isPaginating={mediaSectionViewAll.isPaginating}
            />
          )
        }
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        renderItem={({item}) => (
          <FullMediaListItem
            onPressDetails={() => mediaSectionViewAll.onPressItem(item)}
            voteCount={item.voteCount}
            votes={item.voteAverage}
            image={item.posterPath}
            genres={item.genreIds}
            title={item.title}
          />
        )}
        keyExtractor={({id}, index) => `${id}-${index}`}
        testID="media-view-all-list"
        onEndReached={mediaSectionViewAll.onEndReached}
        data={mediaSectionViewAll.dataset}
      />
    </>
  );
};
