import {useCallback, useEffect, useMemo, useState} from 'react';

import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {useSettingsModal} from '../components/settings/settings-modal/useSettingsModal';
import {HomeStackNavigationProp} from '../routes/route-params-types';
import {useTrendingMovies} from './trending-movies/useTrendingMovies';
import {useTrendingTVShows} from './trending-tv-shows/useTrendingTVShow';

export const TRANSITIONING_DURATION = 500;

type UseHomeProps = {
  navigation: HomeStackNavigationProp;
};

export const useHome = (props: UseHomeProps) => {
  const [isMoviesSelected, setIsMoviesSelected] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const settingsModal = useSettingsModal({navigation: props.navigation});

  const handlePressViewAll = useCallback(
    (params: Types.PressViewAllParams) => {
      props.navigation.navigate(Routes.Home.MEDIA_DETAILS_VIEW_ALL, {
        initialDataset: params.data,
        headerTitle: params.viewAllTitle,
        sectionKey: params.id,
        isMovie: params.isMovie,
      });
    },
    [props.navigation],
  );

  const trendingMovies = useTrendingMovies({
    navigation: props.navigation,
    isSelected: isMoviesSelected,
    onPressViewAll: handlePressViewAll,
  });

  const trendingTVShows = useTrendingTVShows({
    navigation: props.navigation,
    isSelected: !isMoviesSelected,
    onPressViewAll: handlePressViewAll,
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
    onPressSettings: settingsModal.open,
    isSettingsModalOpen: settingsModal.isOpen,
    onPressSettingsOption: settingsModal.onPressOption,
    onCloseSettingsModal: settingsModal.close,
    settingsOptions: settingsModal.options,
    onSelectTVShows: handleSelectTVShows,
    onSelectMovies: handleSelectMovies,
    onPressReload: handleOnPresReload,
    isMoviesSelected,
    shouldShowReload,
    isLoading,
    trendings,
    top3,

    onPressSearch: () => {},
  };
};
