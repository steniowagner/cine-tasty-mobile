import React from 'react';
import {Platform, FlatList} from 'react-native';

import {PaginationFooter, MediaListItem} from '@components';

import {MediaSectionViewAllProps} from '../routes/route-params-types';
import {useMediaSectionViewAll} from './useMediaSectionViewAll';
import * as Styles from './MediaSectionViewAll.styles';

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
        numColumns={Styles.NUMBER_OF_COLUMNS}
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
        contentContainerStyle={Styles.sheet.contentContainerStyle}
        columnWrapperStyle={Styles.sheet.columnWrapperStyle}
        renderItem={({item}) => (
          <MediaListItem
            layoutSize="medium"
            onPress={() => mediaSectionViewAll.onPressItem(item)}
            marginLeft={Styles.sheet.item.marginLeft}
            voteCount={item.voteCount}
            voteAverage={item.voteAverage}
            image={item.posterPath}
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
