import {useCallback, useEffect, useState} from 'react';

import {GET_TRENDING_MOVIES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {useAlertMessage} from '@providers';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

import {useTrendingMoviesSectionTexts} from './useTrendingMoviesSectionTexts';
import {HomeStackNavigationProp} from '../../routes/route-params-types';
import {makeTrendingMoviesSections} from './makeTrendingMoviesSections';
import {useFetchMediaTrending} from '../useFetchMediaTrending';
import {getTop3} from '../getTop3';

type UseTrendingMoviesProps = {
  onPressViewAll: (params: Types.PressViewAllParams) => void;
  navigation: HomeStackNavigationProp;
  isSelected: boolean;
};

export const useTrendingMovies = (props: UseTrendingMoviesProps) => {
  const [trending, setTrending] = useState<Types.HomeSection[]>([]);
  const [top3, setTop3] = useState<Types.HomeTop3Item[]>([]);

  const trendingMoviesSectionTexts = useTrendingMoviesSectionTexts();
  const alertMessage = useAlertMessage();

  const handlePressMediaItem = useCallback(
    (item: Types.SimplifiedMedia) => {
      props.navigation.navigate(Routes.Home.MOVIE_DETAILS, {
        ...item,
        genreIds: item.genreIds || [],
      });
    },
    [props.navigation],
  );

  const handleSetTop3 = useCallback(
    (
      nowPlaying: SchemaTypes.TrendingMovies_trendingMovies_nowPlaying_items[],
    ) => {
      const top3Items = getTop3(nowPlaying, handlePressMediaItem);
      setTop3(top3Items);
    },
    [],
  );

  const handleOnGetData = useCallback(
    (data: SchemaTypes.TrendingMovies) => {
      handleSetTop3(data.trendingMovies.nowPlaying.items);
      const trendingMoviesSections = makeTrendingMoviesSections({
        texts: trendingMoviesSectionTexts,
        onPressMediaItem: handlePressMediaItem,
        onPressViewAll: props.onPressViewAll,
        data,
      });
      setTrending(trendingMoviesSections);
    },
    [
      trendingMoviesSectionTexts,
      handleSetTop3,
      props.onPressViewAll,
      handlePressMediaItem,
    ],
  );

  const fetchTrendingMovies = useFetchMediaTrending<SchemaTypes.TrendingMovies>(
    {
      onCompleted: handleOnGetData,
      query: GET_TRENDING_MOVIES,
    },
  );

  useEffect(() => {
    if (!props.isSelected || trending.length) {
      return;
    }
    fetchTrendingMovies.exec();
  }, [props.isSelected]);

  useEffect(() => {
    if (fetchTrendingMovies.hasError && props.isSelected) {
      alertMessage.show(trendingMoviesSectionTexts.errorMessage);
    }
  }, [fetchTrendingMovies.hasError]);

  return {
    isLoading: fetchTrendingMovies.isLoading,
    hasError: fetchTrendingMovies.hasError,
    exec: fetchTrendingMovies.exec,
    data: trending,
    top3,
  };
};
