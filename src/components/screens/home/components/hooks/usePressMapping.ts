import { useCallback, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { TrendingMediaItemKey, SimplifiedMedia } from 'types';
import { SearchType } from 'types/schema';
import * as TRANSLATIONS from 'i18n/tags';

import { HomeStackParams } from '../../routes/route-params-types';

export const TRANSITIONING_DURATION = 1200;

type ViewAllProps = {
  sectionID: TrendingMediaItemKey;
  sectionItems: SimplifiedMedia[];
  viewAllTitle: string;
};

type Props = {
  navigation: HomeScreenNavigationProp;
  isMoviesSelected: boolean;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HOME'>;

const usePressMapping = ({ isMoviesSelected, navigation }: Props) => {
  const onNavigateToMovieDetailAfterPress = useCallback(
    (movie: SimplifiedMedia): void => {
      navigation.navigate('MOVIE_DETAIL', {
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
    (tvShow: SimplifiedMedia): void => {
      navigation.navigate('TV_SHOW_DETAIL', {
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
      [SearchType.MOVIE]: {
        onPressTop3LearnMore: (movie: SimplifiedMedia) => onNavigateToMovieDetailAfterPress(movie),
        onPressTrendingItem: (movie: SimplifiedMedia) => onNavigateToMovieDetailAfterPress(movie),
        onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => {
          navigation.navigate('MEDIA_DETAILS_VIEW_ALL', {
            initialDataset: sectionItems,
            headerTitle: viewAllTitle,
            sectionKey: sectionID,
            isMovie: true,
          });
        },
        onPressSearch: () => {
          navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef:
              TRANSLATIONS.HOME_SEARCH_MOVIE_PAGINATION_ERROR,
            i18nQueryByTextErrorRef: TRANSLATIONS.HOME_SEARCH_MOVIE_QUERY_BY_TEXT_ERROR,
            i18nSearchBarPlaceholderRef: TRANSLATIONS.HOME_SEARCH_MOVIE_PLACEHOLDER,
            searchType: SearchType.MOVIE,
            queryId: 'search_movie',
          });
        },
      },
      [SearchType.TV]: {
        onPressTop3LearnMore: (tvShow: SimplifiedMedia) => onNavigateToTVShowDetailAfterPress(tvShow),
        onPressTrendingItem: (tvShow: SimplifiedMedia) => onNavigateToTVShowDetailAfterPress(tvShow),
        onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => {
          navigation.navigate('MEDIA_DETAILS_VIEW_ALL', {
            initialDataset: sectionItems,
            headerTitle: viewAllTitle,
            sectionKey: sectionID,
            isMovie: false,
          });
        },
        onPressSearch: () => {
          navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef: TRANSLATIONS.HOME_TV_SHOWS_PAGINATION_ERROR,
            i18nQueryByTextErrorRef: TRANSLATIONS.HOME_SEARCH_TV_SHOW_QUERY_BY_TEXT_ERROR,
            i18nSearchBarPlaceholderRef: TRANSLATIONS.HOME_SEARCH_TV_SHOW_PLACEHOLDER,
            searchType: SearchType.TV,
            queryId: 'search_tv',
          });
        },
      },
    };

    const mediaSelected = isMoviesSelected ? SearchType.MOVIE : SearchType.TV;

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
