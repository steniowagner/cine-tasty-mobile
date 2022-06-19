import {useCallback, useEffect, useState} from 'react';

import {GET_TRENDING_TV_SHOWS} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {useAlertMessage} from '@providers';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

import {HomeStackNavigationProp} from '../routes/route-params-types';
import {useFetchMediaTrending} from './useFetchMediaTrending';
import {getTop3} from './getTop3';

type UseTrendingTVShowsProps = {
  navigation: HomeStackNavigationProp;
  isSelected: boolean;
};

export const useTrendingTVShows = (props: UseTrendingTVShowsProps) => {
  const [trending, setTrending] = useState<Types.HomeSection[]>([]);
  const [top3, setTop3] = useState<Types.HomeTop3Item[]>([]);

  const translations = useTranslations();
  const alertMessage = useAlertMessage();

  const handlePressMediaItem = useCallback(
    (item: Types.SimplifiedMedia) => {
      props.navigation.navigate(Routes.TVShow.DETAILS, {
        ...item,
        genreIds: item.genreIds || [],
      });
    },
    [props.navigation],
  );

  const handlePressViewAll = useCallback(
    (id: Types.TrendingTVShowsKeys) => {
      const section = trending.filter(
        trendingItem => trendingItem.id === id,
      )[0];
      if (!section) {
        return;
      }
      props.navigation.navigate(Routes.Home.MEDIA_DETAILS_VIEW_ALL, {
        initialDataset: section.data,
        headerTitle: section.viewAllTitle,
        sectionKey: section.id,
        isMovie: false,
      });
    },
    [props.navigation, trending],
  );

  const handleSetTop3 = useCallback(
    (
      onTheAir: SchemaTypes.TrendingTVShows_trendingTvShows_onTheAir_items[],
    ) => {
      const top3Items = getTop3(onTheAir, handlePressMediaItem);
      setTop3(top3Items);
    },
    [top3],
  );

  const handleOnGetData = useCallback(
    (data: SchemaTypes.TrendingTVShows) => {
      handleSetTop3(data.trendingTvShows.onTheAir.items);
      setTrending([
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR,
          ),
          id: 'onTheAir',
          data: data.trendingTvShows.onTheAir.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('onTheAir'),
        },
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY,
          ),
          id: 'airingToday',
          data: data.trendingTvShows.airingToday.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('airingToday'),
        },
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR,
          ),
          id: 'popular',
          data: data.trendingTvShows.popular.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('popular'),
        },
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED,
          ),
          id: 'topRated',
          data: data.trendingTvShows.topRated.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('topRated'),
        },
      ]);
    },
    [translations],
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
      const message = translations.translate(
        Translations.Tags.HOME_TRENDING_TV_SHOWS_ERROR,
      );
      alertMessage.show(message);
    }
  }, [fetchTrendingTVShows.hasError]);

  return {
    handlePressTop3LearnMore: handlePressMediaItem,
    isLoading: fetchTrendingTVShows.isLoading,
    hasError: fetchTrendingTVShows.hasError,
    exec: fetchTrendingTVShows.exec,
    data: trending,
    top3,
  };
};
