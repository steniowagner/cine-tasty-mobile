import React from 'react';
import { Platform, FlatList } from 'react-native';

import MediaSectionViewAllListItem from '@components/common/full-media-list-item/FullMediaListItem';
import ListFooterComponent from '@components/common/pagination-footer/PaginationFooter';
import PopupAdvice from '@components/common/popup-advice/PopupAdvice';

import { MediaSectionViewAllStackProps } from '../../routes/route-params-types';
import useMediaSectionViewAll from './useMediaSectionViewAll';

const MediaSectionViewAll = (props: MediaSectionViewAllStackProps) => {
  const mediaSectionViewAll = useMediaSectionViewAll({
    initialMediaItems: props.route.params.initialDataset,
    trendingMediaItemKey: props.route.params.sectionKey,
    isMovie: props.route.params.isMovie,
    navigation: props.navigation,
  });

  return (
    <>
      <FlatList
        ListFooterComponent={() => mediaSectionViewAll.shouldShowListBottomReloadButton && (
        <ListFooterComponent
          onPressReloadButton={mediaSectionViewAll.onPressBottomReloadButton}
          hasError={mediaSectionViewAll.hasPaginationError}
          isPaginating={mediaSectionViewAll.isPaginating}
        />
        )}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        renderItem={({ item }) => (
          <MediaSectionViewAllListItem
            onPressDetails={() => mediaSectionViewAll.onPressItem(item)}
            voteCount={item.voteCount}
            votes={item.voteAverage}
            image={item.posterPath}
            genres={item.genreIds}
            title={item.title}
          />
        )}
        keyExtractor={({ id }, index) => `${id}-${index}`}
        testID="media-view-all-list"
        onEndReached={mediaSectionViewAll.onEndReached}
        data={mediaSectionViewAll.dataset}
      />
      {!!mediaSectionViewAll.error && (
      <PopupAdvice
        text={mediaSectionViewAll.error}
      />
      )}
    </>
  );
};

export default MediaSectionViewAll;
