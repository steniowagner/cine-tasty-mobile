import {useCallback, useEffect, useMemo, useState} from 'react';

import * as Types from '@local-types';

import {HomeStackNavigationProp} from '../routes/route-params-types';
import {useTrendingMovies} from './useTrendingMovies';
import {useTrendingTVShows} from './useTVShowTrending';

export const TRANSITIONING_DURATION = 500;

type UseHomeProps = {
  navigation: HomeStackNavigationProp;
};

export const useHome = (props: UseHomeProps) => {
  const [isMoviesSelected, setIsMoviesSelected] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const trendingMovies = useTrendingMovies({
    navigation: props.navigation,
    isSelected: isMoviesSelected,
  });

  const trendingTVShows = useTrendingTVShows({
    navigation: props.navigation,
    isSelected: !isMoviesSelected,
  });

  const trendings = useMemo(
    () => (isMoviesSelected ? trendingMovies.data : trendingTVShows.data),
    [trendingMovies.data, trendingTVShows.data, isMoviesSelected],
  );

  const top3 = useMemo(
    () => (isMoviesSelected ? trendingMovies.top3 : trendingTVShows.top3),
    [trendingMovies.top3, trendingTVShows.top3, isMoviesSelected],
  );

  const isLoading = useMemo(
    () =>
      trendingTVShows.isLoading || trendingMovies.isLoading || isTransitioning,
    [trendingTVShows.isLoading, trendingMovies.isLoading, isTransitioning],
  );

  const shouldShowReload = useMemo(() => {
    const hasError = trendingMovies.hasError || trendingTVShows.hasError;
    return !trendings.length && hasError && !isLoading;
  }, [trendingMovies.hasError, trendingTVShows.hasError, isLoading, trendings]);

  const handlePressTop3LearnMore = useCallback(
    (top3Item: Types.HomeTop3Item) => {
      const handler = isMoviesSelected
        ? trendingMovies.handlePressTop3LearnMore
        : trendingTVShows.handlePressTop3LearnMore;
      handler(top3Item);
    },
    [
      trendingTVShows.handlePressTop3LearnMore,
      trendingMovies.handlePressTop3LearnMore,
      isMoviesSelected,
    ],
  );

  const handleSelectTVShows = useCallback(() => {
    setIsTransitioning(true);
    setIsMoviesSelected(false);
  }, []);

  const handleSelectMovies = useCallback(() => {
    setIsTransitioning(true);
    setIsMoviesSelected(true);
  }, []);

  const handleOnPresReload = useCallback(() => {
    const handler = isMoviesSelected
      ? trendingMovies.exec
      : trendingTVShows.exec;
    handler();
  }, [trendingMovies.exec, trendingTVShows.exec, isMoviesSelected]);

  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITIONING_DURATION);
    }
  }, [isTransitioning]);

  return {
    onPressTop3LearnMore: handlePressTop3LearnMore,
    onSelectTVShows: handleSelectTVShows,
    onSelectMovies: handleSelectMovies,
    onPressReload: handleOnPresReload,
    shouldShowReload,
    isLoading,
    trendings,
    top3,

    onPressSettings: () => {},
    onPressSearch: () => {},
  };
};
