import React from 'react';
import { Platform, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import MediaSectionViewAllListItem from 'components/common/full-media-list-item/FullMediaListItem';
import { TrendingMediaItemKey, SimplifiedMedia } from 'types';

import { HomeStackParams } from '../../routes/route-params-types';

export const SCREEN_ID = 'MEDIA_DETAILS_VIEW_ALL';

export type ExternalProps = {
  onPressItem: (id: number) => void;
  initialDataset: SimplifiedMedia[];
  sectionKey: TrendingMediaItemKey;
  headerTitle: string;
  isMovie: boolean;
};

export type Props = {
  navigation: StackNavigationProp<HomeStackParams, 'MEDIA_DETAILS_VIEW_ALL'>;
  route: RouteProp<HomeStackParams, 'MEDIA_DETAILS_VIEW_ALL'>;
};

const MediaSectionViewAll = ({ route }: Props) => (
  <FlatList
    onEndReachedThreshold={Platform.select({
      android: 0.5,
      ios: 0.1,
    })}
    renderItem={({ item }) => (
      <MediaSectionViewAllListItem
        onPressDetails={() => route.params.onPressItem(item.id)}
        votes={item.voteAverage}
        image={item.posterPath}
        genres={item.genreIds}
        title={item.title}
      />
    )}
    keyExtractor={({ id }) => `${id}`}
    onEndReached={() => {}}
    testID="search-media-list"
    data={route.params.initialDataset}
  />
);

export default MediaSectionViewAll;
