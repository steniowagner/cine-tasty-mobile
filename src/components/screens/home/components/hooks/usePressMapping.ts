import { useCallback, useMemo } from 'react';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';
import * as Types from '@local-types';

import { HomeStackNavigationProp } from '../../routes/route-params-types';

export const TRANSITIONING_DURATION = 1200;

type ViewAllProps = {
  sectionID: Types.TrendingMediaItemKey;
  sectionItems: Types.SimplifiedMedia[];
  viewAllTitle: string;
};

type UsePressMappingProps = {
  navigation: HomeStackNavigationProp;
  isMoviesSelected: boolean;
};

const usePressMapping = ({ isMoviesSelected, navigation }: UsePressMappingProps) => {
  const onNavigateToMovieDetailAfterPress = useCallback(
    (movie: Types.SimplifiedMedia): void => {
      navigation.navigate(Routes.Movie.DETAILS, {
        genreIds: movie.genreIds || [],
        voteAverage: movie.voteAverage,
        posterPath: movie.posterPath,
        voteCount: movie.voteCount,
        title: movie.title,
        id: movie.id,
      });
    },
    [],
  );

  const onNavigateToTVShowDetailAfterPress = useCallback(
    (tvShow: Types.SimplifiedMedia): void => {
      navigation.navigate(Routes.TVShow.DETAILS, {
        genreIds: tvShow.genreIds || [],
        voteAverage: tvShow.voteAverage,
        posterPath: tvShow.posterPath,
        voteCount: tvShow.voteCount,
        title: tvShow.title,
        id: tvShow.id,
      });
    },
    [],
  );

  const {
    onPressTop3LearnMore,
    onPressTrendingItem,
    onPressViewAll,
    onPressSearch,
  } = useMemo(() => {
    const pressesHandlersMapping = {
      [SchemaTypes.SearchType.MOVIE]: {
        onPressTop3LearnMore: (movie: Types.SimplifiedMedia) => onNavigateToMovieDetailAfterPress(movie),
        onPressTrendingItem: (movie: Types.SimplifiedMedia) => onNavigateToMovieDetailAfterPress(movie),
        onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => {
          navigation.navigate(Routes.Home.MEDIA_DETAILS_VIEW_ALL, {
            initialDataset: sectionItems,
            headerTitle: viewAllTitle,
            sectionKey: sectionID,
            isMovie: true,
          });
        },
        onPressSearch: () => {
          navigation.navigate(Routes.Search.SEARCH, {
            i18nQueryByPaginationErrorRef:
              TRANSLATIONS.HOME_SEARCH_MOVIE_PAGINATION_ERROR,
            i18nQueryByTextErrorRef: TRANSLATIONS.HOME_SEARCH_MOVIE_QUERY_BY_TEXT_ERROR,
            i18nSearchBarPlaceholderRef: TRANSLATIONS.HOME_SEARCH_MOVIE_PLACEHOLDER,
            searchType: SchemaTypes.SearchType.MOVIE,
            queryId: 'search_movie',
          });
        },
      },
      [SchemaTypes.SearchType.TV]: {
        onPressTop3LearnMore: (tvShow: Types.SimplifiedMedia) => onNavigateToTVShowDetailAfterPress(tvShow),
        onPressTrendingItem: (tvShow: Types.SimplifiedMedia) => onNavigateToTVShowDetailAfterPress(tvShow),
        onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => {
          navigation.navigate(Routes.Home.MEDIA_DETAILS_VIEW_ALL, {
            initialDataset: sectionItems,
            headerTitle: viewAllTitle,
            sectionKey: sectionID,
            isMovie: false,
          });
        },
        onPressSearch: () => {
          navigation.navigate(Routes.Search.SEARCH, {
            i18nQueryByPaginationErrorRef: TRANSLATIONS.HOME_TV_SHOWS_PAGINATION_ERROR,
            i18nQueryByTextErrorRef: TRANSLATIONS.HOME_SEARCH_TV_SHOW_QUERY_BY_TEXT_ERROR,
            i18nSearchBarPlaceholderRef: TRANSLATIONS.HOME_SEARCH_TV_SHOW_PLACEHOLDER,
            searchType: SchemaTypes.SearchType.TV,
            queryId: 'search_tv',
          });
        },
      },
    };

    const mediaSelected = isMoviesSelected
      ? SchemaTypes.SearchType.MOVIE
      : SchemaTypes.SearchType.TV;

    return pressesHandlersMapping[mediaSelected];
  }, [isMoviesSelected]);

  return {
    onPressTop3LearnMore,
    onPressTrendingItem,
    onPressViewAll,
    onPressSearch,
  };
};

export default usePressMapping;
