import React from 'react';
import { Platform, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import MediaSectionViewAllListItem from 'components/common/full-media-list-item/FullMediaListItem';
import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import { TrendingMediaItemKey, SimplifiedMedia } from 'types';

import { HomeStackParams } from '../../routes/route-params-types';
import useMediaSectionViewAll from './useMediaSectionViewAll';

export const SCREEN_ID = 'MEDIA_DETAILS_VIEW_ALL';

export type ExternalProps = {
  initialDataset: SimplifiedMedia[];
  sectionKey: TrendingMediaItemKey;
  headerTitle: string;
  isMovie: boolean;
};

export type Props = {
  navigation: StackNavigationProp<HomeStackParams, 'MEDIA_DETAILS_VIEW_ALL'>;
  route: RouteProp<HomeStackParams, 'MEDIA_DETAILS_VIEW_ALL'>;
};

const MediaSectionViewAll = ({ navigation, route }: Props) => {
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
        ListFooterComponent={() => shouldShowListBottomReloadButton && (
        <ListFooterComponent
          onPressReloadButton={onPressBottomReloadButton}
          hasError={hasPaginationError}
          isPaginating={isPaginating}
        />
        )}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        renderItem={({ item }) => (
          <MediaSectionViewAllListItem
            onPressDetails={() => onPressItem(item)}
            voteCount={item.voteCount}
            votes={item.voteAverage}
            image={item.posterPath}
            genres={item.genreIds}
            title={item.title}
          />
        )}
        keyExtractor={({ id }, index) => `${id}-${index}`}
        testID="media-view-all-list"
        onEndReached={onEndReached}
        data={dataset}
      />
      {!!error && (
      <PopupAdvice
        text={error}
      />
      )}
    </>
  );
};

export default MediaSectionViewAll;
