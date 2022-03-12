import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useRecentSearches from '../../recent-searches/useRecentSearches';

type UseMoviesPressHandlersProps = {
  navigation: SearchNavigationProp;
};

const useMoviesPressHandlers = (props: UseMoviesPressHandlersProps) => {
  const recentSearches = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: SchemaTypes.SearchType.MOVIE,
  });

  const handlePersistToRecentSearches = useCallback(
    async (movie: SchemaTypes.SearchMovie_search_items_BaseMovie) => {
      recentSearches.persistItemToRecentSearches({
        image: movie.posterPath,
        title: movie.title,
        id: movie.id,
      });
    },
    [recentSearches.persistItemToRecentSearches],
  );

  const handlePressMoviesListItem = useCallback(
    (movie: SchemaTypes.SearchMovie_search_items_BaseMovie) => {
      handlePersistToRecentSearches(movie);
      props.navigation.navigate(Routes.Movie.DETAILS, {
        genreIds: movie.genreIds || [],
        voteAverage: movie.voteAverage,
        posterPath: movie.posterPath,
        voteCount: movie.voteCount,
        title: movie.title,
        id: movie.id,
      });
    },
    [handlePersistToRecentSearches, props.navigation],
  );

  const handlePressRecentMoviesSearchItem = useCallback(
    (movie: Types.RecentSearchItem) => {
      props.navigation.navigate(Routes.Movie.DETAILS, {
        posterPath: movie.image,
        title: movie.title,
        id: movie.id,
      });
    },
    [props.navigation],
  );

  return {
    onPressRecentSearchItem: handlePressRecentMoviesSearchItem,
    onPressListItem: handlePressMoviesListItem,
  };
};

export default useMoviesPressHandlers;
