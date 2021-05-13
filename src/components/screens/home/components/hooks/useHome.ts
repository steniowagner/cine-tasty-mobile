import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

import { GET_TRENDING_TV_SHOWS, GET_TRENDING_MOVIES } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';

import { HomeStackProps } from '../../routes/route-params-types';
import useTrendingTVShows from './trendings/useTrendingTVShows';
import useTrendingMovies from './trendings/useTrendingMovies';
import useHomeTrendings from './useHomeTrendings';
import usePressMapping from './usePressMapping';
import useTop3 from './top3/useTop3';

export const TRANSITIONING_DURATION = 500;

const useHome = (props: HomeStackProps) => {
  const [shouldDisableHeaderActions, setShouldDisableHeaderActions] = useState<boolean>(
    true,
  );
  const [trendingTVShows, setTrendingTVShows] = useState<SchemaTypes.TrendingTVShows>(
    undefined,
  );
  const [trendingMovies, setTrendingMovies] = useState<SchemaTypes.TrendingMovies>(
    undefined,
  );
  const [isTransitioningData, setIsTransitioningData] = useState<boolean>(false);
  const [isMoviesSelected, setIsMovieSelected] = useState<boolean>(true);

  const { t } = useTranslation();

  const pressMapping = usePressMapping({
    navigation: props.navigation,
    isMoviesSelected,
  });

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
  } = useHomeTrendings<SchemaTypes.TrendingMovies>({
    onGetData: setTrendingMovies,
    query: GET_TRENDING_MOVIES,
  });

  const {
    hasError: hasTrendingTVShowsError,
    getTrendings: getTrendingTVShows,
    isLoading: isLoadingTVShows,
  } = useHomeTrendings<SchemaTypes.TrendingTVShows>({
    onGetData: setTrendingTVShows,
    query: GET_TRENDING_TV_SHOWS,
  });

  const top3 = useTop3({
    trendingTVShows,
    trendingMovies,
  });

  const errorMessage = useMemo((): string => {
    if (isMoviesSelected && hasTrendingMoviesError) {
      return t(TRANSLATIONS.HOME_TRENDING_MOVIES_ERROR);
    }

    if (!isMoviesSelected && hasTrendingTVShowsError) {
      return t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ERROR);
    }

    return '';
  }, [isMoviesSelected, hasTrendingMoviesError, hasTrendingTVShowsError]);

  const getSelectedMediaTrendings = useCallback(async () => {
    const isLoading = isLoadingMovies || isLoadingTVShows;

    if (isLoading) {
      return;
    }

    setShouldDisableHeaderActions(true);

    const getTrendings = isMoviesSelected ? getTrendingMovies : getTrendingTVShows;

    await getTrendings();

    setShouldDisableHeaderActions(false);

    setIsTransitioningData(false);
  }, [isMoviesSelected, isLoadingMovies, isLoadingTVShows]);

  useEffect(() => {
    getSelectedMediaTrendings();
  }, [isMoviesSelected]);

  const onSelectSwitchItem = useCallback((isSelectingMovie: boolean) => {
    setShouldDisableHeaderActions(true);

    setIsTransitioningData(true);

    setIsMovieSelected(isSelectingMovie);
  }, []);

  const onPressReload = useCallback(() => {
    if (!errorMessage) {
      return;
    }

    getSelectedMediaTrendings();
  }, [errorMessage, getSelectedMediaTrendings]);

  const onSelectTVShows = useCallback(() => onSelectSwitchItem(false), []);

  const onSelectMovies = useCallback(() => onSelectSwitchItem(true), []);

  return {
    trendings: isMoviesSelected ? homeTrendingMovies : homeTrendingTVShows,
    isLoading: isLoadingMovies || isLoadingTVShows || isTransitioningData,
    top3: isMoviesSelected ? top3.top3Movies : top3.top3TVShows,
    onPressTop3LearnMore: pressMapping.onPressTop3LearnMore,
    onPressTrendingItem: pressMapping.onPressTrendingItem,
    onPressViewAll: pressMapping.onPressViewAll,
    onPressSearch: pressMapping.onPressSearch,
    shouldDisableHeaderActions,
    onSelectTVShows,
    onSelectMovies,
    onPressReload,
    errorMessage,
  };
};

export default useHome;
