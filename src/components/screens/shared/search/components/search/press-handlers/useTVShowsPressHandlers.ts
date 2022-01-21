import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useRecentSearches from '../../recent-searches/useRecentSearches';

type UseTVShowsPressHandlersProps = {
  navigation: SearchNavigationProp;
};

const useTVShowsPressHandlers = ({
  navigation,
}: UseTVShowsPressHandlersProps) => {
  const {persistItemToRecentSearches} = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: SchemaTypes.SearchType.TV,
  });

  const handlePersistToRecentSearches = useCallback(
    async (tvShow: SchemaTypes.SearchTVShow_search_items_BaseTVShow) => {
      persistItemToRecentSearches({
        image: tvShow.posterPath,
        title: tvShow.title,
        id: tvShow.id,
      });
    },
    [persistItemToRecentSearches],
  );

  const onPressTVShowsListItem = useCallback(
    (tvShow: SchemaTypes.SearchTVShow_search_items_BaseTVShow) => {
      handlePersistToRecentSearches(tvShow);
      navigation.navigate(Routes.TVShow.DETAILS, {
        genreIds: tvShow.genreIds || [],
        voteAverage: tvShow.voteAverage,
        posterPath: tvShow.posterPath,
        voteCount: tvShow.voteCount,
        title: tvShow.title,
        id: tvShow.id,
      });
    },
    [handlePersistToRecentSearches, navigation],
  );

  const onPressRecentTVShowsSearchItem = useCallback(
    (tvShow: Types.RecentSearchItem) => {
      navigation.navigate(Routes.TVShow.DETAILS, {
        posterPath: tvShow.image,
        title: tvShow.title,
        id: tvShow.id,
      });
    },
    [navigation],
  );

  return {
    onPressRecentSearchItem: onPressRecentTVShowsSearchItem,
    onPressListItem: onPressTVShowsListItem,
  };
};

export default useTVShowsPressHandlers;
