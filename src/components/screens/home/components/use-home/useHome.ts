import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { SEARCH_MOVIES, SEARCH_TV_SHOWS } from 'components/screens/shared/search/queries';
import { TrendingTVShows, TrendingMovies, SearchType } from 'types/schema';
import { HomeTop3Item, HomeSection, SimplifiedMedia } from 'types';

import { GET_TRENDING_TV_SHOWS, GET_TRENDING_MOVIES } from '../queries';
import { HomeStackParams } from '../../routes/route-params-types';
import useTrendingTVShows from './trendings/useTrendingTVShows';
import useTrendingMovies from './trendings/useTrendingMovies';
import useHomeTrendings from './useHomeTrendings';
import useTop3 from './top3/useTop3';

export const TRENDING_TV_SHOWS_ERROR_REF_I18N = 'translations:home:trendingTvShows:error';
export const TRENDING_MOVIES_ERROR_REF_I18N = 'translations:home:trendingMovies:error';

export const SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF = 'translations:home:search:movie:queryByTextError';
export const SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF = 'translations:home:search:movie:paginationError';
export const SEARCH_MOVIE_PLACEHOLDER_I18N_REF = 'translations:home:search:movie:placeholder';

export const SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF = 'translations:home:search:tvShows:queryByTextError';
export const SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF = 'translations:home:search:tvShows:paginationError';
export const SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF = 'translations:home:search:tvShows:placeholder';

export const TRANSITIONING_DURATION = 1200;

type State = {
  onPressViewAll: (sectionItems: SimplifiedMedia[], sectionTitle: string) => void;
  onPressTop3LearnMore: (id: number) => void;
  onPressTrendingItem: (id: number) => void;
  shouldDisableHeaderActions: boolean;
  onSelectTVShows: () => void;
  onSelectMovies: () => void;
  onPressSearch: () => void;
  trendings: HomeSection[];
  errorMessage: string;
  top3: HomeTop3Item[];
  isLoading: boolean;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HOME'>;

const useHome = (navigation: HomeScreenNavigationProp): State => {
  const [shouldDisableHeaderActions, setShouldDisableHeaderActions] = useState<boolean>(
    true,
  );
  const [trendingTVShows, setTrendingTVShows] = useState<TrendingTVShows>(undefined);
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovies>(undefined);
  const [isTransitioningData, setIsTransitioningData] = useState<boolean>(false);
  const [isMoviesSelected, setIsMovieSelected] = useState<boolean>(true);

  const { t } = useTranslation();

  const { trendingMovies: homeTrendingMovies } = useTrendingMovies({
    rawTrendingMovies: trendingMovies,
  });

  const { trendingTVShows: homeTrendingTVShows } = useTrendingTVShows({
    rawTrendingTVShows: trendingTVShows,
  });

  const {
    hasError: hasTrendingMoviesError,
    getTrendings: getTrendingMovies,
    isLoading: isLoadingMovies,
  } = useHomeTrendings<TrendingMovies>({
    onGetData: setTrendingMovies,
    query: GET_TRENDING_MOVIES,
  });

  const {
    hasError: hasTrendingTVShowsError,
    getTrendings: getTrendingTVShows,
    isLoading: isLoadingTVShows,
  } = useHomeTrendings<TrendingTVShows>({
    onGetData: setTrendingTVShows,
    query: GET_TRENDING_TV_SHOWS,
  });

  const { top3TVShows, top3Movies } = useTop3({
    trendingTVShows,
    trendingMovies,
  });

  useEffect(() => {
    if (!isMoviesSelected && !trendingTVShows) {
      getTrendingTVShows();
    }

    if (isMoviesSelected && !trendingMovies) {
      getTrendingMovies();
    }
  }, [isMoviesSelected, trendingTVShows, trendingMovies]);

  useEffect(() => {
    if (!isMoviesSelected && hasTrendingTVShowsError) {
      getTrendingTVShows();
    }

    if (isMoviesSelected && hasTrendingMoviesError) {
      getTrendingMovies();
    }
  }, [isMoviesSelected]);

  useEffect(() => {
    if (!isTransitioningData) {
      setTimeout(() => {
        setShouldDisableHeaderActions(false);
      }, TRANSITIONING_DURATION * 2);
    }
  }, [isTransitioningData, isLoadingTVShows]);

  useEffect(() => {
    if (isTransitioningData) {
      setTimeout(() => {
        setIsTransitioningData(false);
      }, TRANSITIONING_DURATION);
    }
  }, [isTransitioningData]);

  const errorMessage = useMemo((): string => {
    if (isMoviesSelected && hasTrendingMoviesError) {
      return t(TRENDING_MOVIES_ERROR_REF_I18N);
    }

    if (!isMoviesSelected && hasTrendingTVShowsError) {
      return t(TRENDING_TV_SHOWS_ERROR_REF_I18N);
    }

    return '';
  }, [isMoviesSelected, hasTrendingMoviesError, hasTrendingTVShowsError]);

  const onSelectMovies = useCallback(() => {
    if (trendingMovies) {
      setShouldDisableHeaderActions(true);
      setIsTransitioningData(true);
    }

    setIsMovieSelected(true);
  }, [trendingMovies]);

  const onSelectTVShows = useCallback(() => {
    setShouldDisableHeaderActions(true);

    if (trendingTVShows) {
      setIsTransitioningData(true);
    }

    setIsMovieSelected(false);
  }, [trendingTVShows]);

  const {
    onPressTop3LearnMore,
    onPressTrendingItem,
    onPressViewAll,
    onPressSearch,
  } = useMemo(() => {
    const pressMapping = {
      [SearchType.MOVIE]: {
        onPressTop3LearnMore: (id: number) => console.warn('onPressTop3LearnMore [MOVIES] - ', id),
        onPressTrendingItem: (id: number) => console.warn('onPressTrendingItem [MOVIES]: ', id),
        onPressViewAll: (sectionItems: SimplifiedMedia[], sectionTitle: string) => {
          navigation.navigate('MEDIA_DETAILS_VIEW_ALL', {
            initialDataset: sectionItems,
            headerTitle: `${sectionTitle} - ${t('translations:home:movies')}`,
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
        onPressTop3LearnMore: (id: number) => console.warn('onPressTop3LearnMore [TV-SHOW] - ', id),
        onPressTrendingItem: (id: number) => console.warn('onPressTrendingItem [TV-SHOW]: ', id),
        onPressViewAll: (sectionItems: SimplifiedMedia[], sectionTitle: string) => navigation.navigate('MEDIA_DETAILS_VIEW_ALL', {
          initialDataset: sectionItems,
          headerTitle: `${sectionTitle} - ${t('translations:home:tvShows')}`,
        }),
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

    return pressMapping[mediaSelected];
  }, [isMoviesSelected]);

  return {
    trendings: isMoviesSelected ? homeTrendingMovies : homeTrendingTVShows,
    isLoading: isLoadingMovies || isLoadingTVShows || isTransitioningData,
    top3: isMoviesSelected ? top3Movies : top3TVShows,
    shouldDisableHeaderActions,
    onPressTop3LearnMore,
    onPressTrendingItem,
    onPressViewAll,
    onSelectTVShows,
    onSelectMovies,
    onPressSearch,
    errorMessage,
  };
};

export default useHome;
