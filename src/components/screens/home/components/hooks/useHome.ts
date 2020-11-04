import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import {
  TrendingMediaItemKey, HomeTop3Item, HomeSection, SimplifiedMedia,
} from 'types';
import { TrendingTVShows, TrendingMovies } from 'types/schema';

import { GET_TRENDING_TV_SHOWS, GET_TRENDING_MOVIES } from '../queries';
import { HomeStackParams } from '../../routes/route-params-types';
import useTrendingTVShows from './trendings/useTrendingTVShows';
import useTrendingMovies from './trendings/useTrendingMovies';
import useHomeTrendings from './useHomeTrendings';
import usePressMapping from './usePressMapping';
import useTop3 from './top3/useTop3';

export const TRENDING_TV_SHOWS_ERROR_REF_I18N = 'translations:home:trendingTvShows:error';
export const TRENDING_MOVIES_ERROR_REF_I18N = 'translations:home:trendingMovies:error';
export const TRANSITIONING_DURATION = 1200;

type ViewAllProps = {
  sectionItems: SimplifiedMedia[];
  sectionID: TrendingMediaItemKey;
  viewAllTitle: string;
};

type State = {
  onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => void;
  onPressTop3LearnMore: (mediaItem: SimplifiedMedia) => void;
  onPressTrendingItem: (mediaItem: SimplifiedMedia) => void;
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

const useHome = (
  navigation: HomeScreenNavigationProp,
  isMovieSelectedInitially = true,
): State => {
  const [isMoviesSelected, setIsMovieSelected] = useState<boolean>(
    isMovieSelectedInitially,
  );
  const [shouldDisableHeaderActions, setShouldDisableHeaderActions] = useState<boolean>(
    true,
  );
  const [trendingTVShows, setTrendingTVShows] = useState<TrendingTVShows>(undefined);
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovies>(undefined);
  const [isTransitioningData, setIsTransitioningData] = useState<boolean>(false);

  const { t } = useTranslation();

  const {
    onPressTop3LearnMore,
    onPressTrendingItem,
    onPressViewAll,
    onPressSearch,
  } = usePressMapping({
    isMoviesSelected,
    navigation,
  });

  const { trendingMovies: homeTrendingMovies } = useTrendingMovies({
    rawTrendingMovies: trendingMovies,
  });

  const { trendingTVShows: homeTrendingTVShows } = useTrendingTVShows({
    rawTrendingTVShows: trendingTVShows,
  });
  console.log(trendingMovies);
  // console.log('trendingTVShows: ', trendingTVShows?.nowPlaying.items);

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
