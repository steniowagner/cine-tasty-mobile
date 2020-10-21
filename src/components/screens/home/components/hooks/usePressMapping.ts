import { useCallback, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { SEARCH_MOVIES, SEARCH_TV_SHOWS } from 'components/screens/shared/search/queries';
import { TrendingMediaItemKey, SimplifiedMedia } from 'types';
import { SearchType } from 'types/schema';

import { HomeStackParams } from '../../routes/route-params-types';

export const SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF = 'translations:home:search:movie:queryByTextError';
export const SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF = 'translations:home:search:movie:paginationError';
export const SEARCH_MOVIE_PLACEHOLDER_I18N_REF = 'translations:home:search:movie:placeholder';

export const SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF = 'translations:home:search:tvShows:queryByTextError';
export const SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF = 'translations:home:search:tvShows:paginationError';
export const SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF = 'translations:home:search:tvShows:placeholder';

export const TRANSITIONING_DURATION = 1200;

type ViewAllProps = {
  sectionID: TrendingMediaItemKey;
  sectionItems: SimplifiedMedia[];
  viewAllTitle: string;
};

type State = {
  onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => void;
  onPressTop3LearnMore: (media: SimplifiedMedia) => void;
  onPressTrendingItem: (media: SimplifiedMedia) => void;
  onPressSearch: () => void;
};

type Props = {
  navigation: HomeScreenNavigationProp;
  isMoviesSelected: boolean;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HOME'>;

const usePressMapping = ({ isMoviesSelected, navigation }: Props): State => {
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
            onPressItem: (movie: SimplifiedMedia) => onNavigateToMovieDetailAfterPress(movie),
            initialDataset: sectionItems,
            headerTitle: viewAllTitle,
            sectionKey: sectionID,
            isMovie: true,
          });
        },
        onPressSearch: () => {
          navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef: SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
            i18nQueryByTextErrorRef: SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
            i18nSearchBarPlaceholderRef: SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
            searchType: SearchType.MOVIE,
            query: SEARCH_MOVIES,
          });
        },
      },
      [SearchType.TV]: {
        onPressTop3LearnMore: (tvShow: SimplifiedMedia) => onNavigateToTVShowDetailAfterPress(tvShow),
        onPressTrendingItem: (tvShow: SimplifiedMedia) => onNavigateToTVShowDetailAfterPress(tvShow),
        onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => {
          navigation.navigate('MEDIA_DETAILS_VIEW_ALL', {
            onPressItem: (tvShow: SimplifiedMedia) => onNavigateToTVShowDetailAfterPress(tvShow),
            initialDataset: sectionItems,
            headerTitle: viewAllTitle,
            sectionKey: sectionID,
            isMovie: false,
          });
        },
        onPressSearch: () => {
          navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef: SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF,
            i18nQueryByTextErrorRef: SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF,
            i18nSearchBarPlaceholderRef: SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF,
            searchType: SearchType.TV,
            query: SEARCH_TV_SHOWS,
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
