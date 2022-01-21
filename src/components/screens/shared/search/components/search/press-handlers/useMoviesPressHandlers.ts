import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useRecentSearches from '../../recent-searches/useRecentSearches';

type UseMoviesPressHandlersProps = {
  navigation: SearchNavigationProp;
};

const useMoviesPressHandlers = ({navigation}: UseMoviesPressHandlersProps) => {
  const {persistItemToRecentSearches} = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: SchemaTypes.SearchType.MOVIE,
  });

  const handlePersistToRecentSearches = useCallback(
    async (movie: SchemaTypes.SearchMovie_search_items_BaseMovie) => {
      persistItemToRecentSearches({
        image: movie.posterPath,
        title: movie.title,
        id: movie.id,
      });
    },
    [persistItemToRecentSearches],
  );

  const onPressMoviesListItem = useCallback(
    (movie: SchemaTypes.SearchMovie_search_items_BaseMovie) => {
      handlePersistToRecentSearches(movie);
      navigation.navigate(Routes.Movie.DETAILS, {
        genreIds: movie.genreIds || [],
        voteAverage: movie.voteAverage,
        posterPath: movie.posterPath,
        voteCount: movie.voteCount,
        title: movie.title,
        id: movie.id,
      });
    },
    [handlePersistToRecentSearches, navigation],
  );

  const onPressRecentMoviesSearchItem = useCallback(
    (movie: Types.RecentSearchItem) => {
      navigation.navigate(Routes.Movie.DETAILS, {
        posterPath: movie.image,
        title: movie.title,
        id: movie.id,
      });
    },
    [navigation],
  );

  return {
    onPressRecentSearchItem: onPressRecentMoviesSearchItem,
    onPressListItem: onPressMoviesListItem,
  };
};

export default useMoviesPressHandlers;
