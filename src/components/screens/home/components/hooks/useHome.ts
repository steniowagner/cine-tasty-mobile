import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import * as Types from '@local-types';

import { GET_TRENDING_TV_SHOWS, GET_TRENDING_MOVIES } from '@graphql/queries';
import { HomeStackParams } from '../../routes/route-params-types';
import useTrendingTVShows from './trendings/useTrendingTVShows';
import useTrendingMovies from './trendings/useTrendingMovies';
import useHomeTrendings from './useHomeTrendings';
import usePressMapping from './usePressMapping';
import useTop3 from './top3/useTop3';

export const TRANSITIONING_DURATION = 500;

type ViewAllProps = {
  sectionItems: Types.SimplifiedMedia[];
  sectionID: Types.TrendingMediaItemKey;
  viewAllTitle: string;
};

type State = {
  onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => void;
  onPressTop3LearnMore: (mediaItem: Types.SimplifiedMedia) => void;
  onPressTrendingItem: (mediaItem: Types.SimplifiedMedia) => void;
  shouldDisableHeaderActions: boolean;
  onSelectTVShows: () => void;
  onSelectMovies: () => void;
  onPressSearch: () => void;
  trendings: Types.HomeSection[];
  errorMessage: string;
  top3: Types.HomeTop3Item[];
  isLoading: boolean;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HOME'>;

const useHome = (navigation: HomeScreenNavigationProp): State => {
  const [shouldDisableHeaderActions, setShouldDisableHeaderActions] = useState<boolean>(
    true,
  );
  const [isMoviesSelected, setIsMovieSelected] = useState<boolean>(true);
  const [trendingTVShows, setTrendingTVShows] = useState<SchemaTypes.TrendingTVShows>(
    undefined,
  );
  const [trendingMovies, setTrendingMovies] = useState<SchemaTypes.TrendingMovies>(
    undefined,
  );
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
      return t(TRANSLATIONS.HOME_TRENDING_MOVIES_ERROR);
    }

    if (!isMoviesSelected && hasTrendingTVShowsError) {
      return t(TRANSLATIONS.HOME_TRENDING_TV_SHOWS_ERROR);
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
