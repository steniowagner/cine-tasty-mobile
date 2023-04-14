import {useCallback, useEffect, useState} from 'react';

import {GET_TRENDING_TV_SHOWS} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {useAlertMessage} from '@providers';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

import {useTrendingTVShowsSectionTexts} from './useTrendingTVShowsSectionTexts';
import {makeTrendingTVShowsSections} from './makeTrendingTVShowsSections';
import {HomeStackNavigationProp} from '../../routes/route-params-types';
import {useFetchMediaTrending} from '../useFetchMediaTrending';
import {getTop3} from '../getTop3';

type UseTrendingTVShowsProps = {
  onPressViewAll: (params: Types.PressViewAllParams) => void;
  navigation: HomeStackNavigationProp;
  isSelected: boolean;
};

export const useTrendingTVShows = (props: UseTrendingTVShowsProps) => {
  const [trending, setTrending] = useState<Types.HomeSection[]>([]);
  const [top3, setTop3] = useState<Types.HomeTop3Item[]>([]);

  const trendingTVShowsSectionTexts = useTrendingTVShowsSectionTexts();
  const alertMessage = useAlertMessage();

  const handlePressMediaItem = useCallback(
    (item: Types.SimplifiedMedia) => {
      props.navigation.navigate(Routes.Home.TV_SHOW_DETAILS, {
        ...item,
        genreIds: item.genreIds || [],
      });
    },
    [props.navigation],
  );

  const handleSetTop3 = useCallback(
    (
      onTheAir: SchemaTypes.TrendingTVShows_trendingTvShows_onTheAir_items[],
    ) => {
      const top3Items = getTop3(onTheAir, handlePressMediaItem);
      setTop3(top3Items);
    },
    [],
  );

  const handleOnGetData = useCallback(
    (data: SchemaTypes.TrendingTVShows) => {
      handleSetTop3(data.trendingTvShows.onTheAir.items);
      const trendingTVShowsSections = makeTrendingTVShowsSections({
        texts: trendingTVShowsSectionTexts,
        onPressMediaItem: handlePressMediaItem,
        onPressViewAll: props.onPressViewAll,
        data,
      });
      setTrending(trendingTVShowsSections);
    },
    [handleSetTop3],
  );

  const fetchTrendingTVShows =
    useFetchMediaTrending<SchemaTypes.TrendingTVShows>({
      onCompleted: handleOnGetData,
      query: GET_TRENDING_TV_SHOWS,
    });

  useEffect(() => {
    if (!props.isSelected || trending.length) {
      return;
    }
    fetchTrendingTVShows.exec();
  }, [props.isSelected]);

  useEffect(() => {
    if (fetchTrendingTVShows.hasError && props.isSelected) {
      alertMessage.show(trendingTVShowsSectionTexts.errorMessage);
    }
  }, [fetchTrendingTVShows.hasError]);

  return {
    isLoading: fetchTrendingTVShows.isLoading,
    hasError: fetchTrendingTVShows.hasError,
    exec: fetchTrendingTVShows.exec,
    data: trending,
    top3,
  };
};
