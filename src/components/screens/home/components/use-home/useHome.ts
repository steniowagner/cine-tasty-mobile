import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { TrendingTVShows, TrendingMovies, SearchType } from 'types/schema';
import { SEARCH_MOVIES } from 'components/screens/shared/search/queries';
import { HomeTop3Item, HomeSection } from 'types';

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

export const TRANSITIONING_DURATION = 1200;

type State = {
  onPressTop3LearnMore: (id: number) => void;
  onPressTrendingItem: (id: number) => void;
  shouldDisableHeaderActions: boolean;
  onSelectTVShows: () => void;
  onPressViewAll: () => void;
  onSelectMovies: () => void;
  onPressSearch: () => void;
  trendings: HomeSection[];
  errorMessage: string;
  top3: HomeTop3Item[];
  isLoading: boolean;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HOME'>;

type PressMapping = {
  onPressTop3LearnMore: (id: number) => void;
  onPressTrendingItem: (id: number) => void;
  onPressViewAll: () => void;
};

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

  const onPressMapping = useMemo((): PressMapping => {
    if (isMoviesSelected) {
      return {
        onPressTop3LearnMore: (id: number) => console.warn('onPressTop3LearnMore [MOVIES] - ', id),
        onPressTrendingItem: (id: number) => console.warn('onPressTrendingItem [MOVIES]: ', id),
        onPressViewAll: () => console.warn('onPressViewAll [MOVIES]'),
      };
    }

    return {
      onPressTop3LearnMore: (id: number) => console.warn('onPressTop3LearnMore [TV-SHOW] - ', id),
      onPressTrendingItem: (id: number) => console.warn('onPressTrendingItem [TV-SHOW]: ', id),
      onPressViewAll: () => console.warn('onPressViewAll [TV-SHOWS]'),
    };
  }, [isMoviesSelected]);

  const top3Data = useMemo(
    (): HomeTop3Item[] => (isMoviesSelected ? top3Movies : top3TVShows),
    [isMoviesSelected, top3TVShows, top3Movies],
  );

  const trendings = useMemo(
    (): HomeSection[] => (isMoviesSelected ? homeTrendingMovies : homeTrendingTVShows),
    [isMoviesSelected, homeTrendingMovies, homeTrendingTVShows],
  );

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

  const onPressSearch = useCallback(() => {
    let searchParams;

    if (isMoviesSelected) {
      searchParams = {
        i18nQueryByPaginationErrorRef: SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
        i18nQueryByTextErrorRef: SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
        i18nSearchBarPlaceholderRef: SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
        searchType: SearchType.MOVIE,
        query: SEARCH_MOVIES,
      };
    }

    navigation.navigate('SEARCH', searchParams);
  }, [isMoviesSelected]);

  return {
    isLoading: isLoadingMovies || isLoadingTVShows || isTransitioningData,
    onPressTop3LearnMore: onPressMapping.onPressTop3LearnMore,
    onPressTrendingItem: onPressMapping.onPressTrendingItem,
    onPressViewAll: onPressMapping.onPressViewAll,
    shouldDisableHeaderActions,
    onSelectTVShows,
    onSelectMovies,
    top3: top3Data,
    onPressSearch,
    errorMessage,
    trendings,
  };
};

export default useHome;
