import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useRecentSearches from '../../recent-searches/useRecentSearches';

type UseTVShowsPressHandlersProps = {
  navigation: SearchNavigationProp;
};

const useTVShowsPressHandlers = (props: UseTVShowsPressHandlersProps) => {
  const recentSearches = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: SchemaTypes.SearchType.TV,
  });

  const handlePersistToRecentSearches = useCallback(
    async (tvShow: SchemaTypes.SearchTVShow_search_items_BaseTVShow) => {
      recentSearches.persistItemToRecentSearches({
        image: tvShow.posterPath,
        title: tvShow.title,
        id: tvShow.id,
      });
    },
    [recentSearches.persistItemToRecentSearches],
  );

  const handlePressTVShowsListItem = useCallback(
    (tvShow: SchemaTypes.SearchTVShow_search_items_BaseTVShow) => {
      handlePersistToRecentSearches(tvShow);
      props.navigation.navigate(Routes.TVShow.DETAILS, {
        genreIds: tvShow.genreIds || [],
        voteAverage: tvShow.voteAverage,
        posterPath: tvShow.posterPath,
        voteCount: tvShow.voteCount,
        title: tvShow.title,
        id: tvShow.id,
      });
    },
    [handlePersistToRecentSearches, props.navigation],
  );

  const handlePressRecentTVShowsSearchItem = useCallback(
    (tvShow: Types.RecentSearchItem) => {
      props.navigation.navigate(Routes.TVShow.DETAILS, {
        posterPath: tvShow.image,
        title: tvShow.title,
        id: tvShow.id,
      });
    },
    [props.navigation],
  );

  return {
    onPressRecentSearchItem: handlePressRecentTVShowsSearchItem,
    onPressListItem: handlePressTVShowsListItem,
  };
};

export default useTVShowsPressHandlers;
