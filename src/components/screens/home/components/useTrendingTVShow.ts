import {useCallback, useEffect, useMemo, useState} from 'react';

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
  onPressViewAll: (params: Types.PressViewAllParams) => void;
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
    [top3],
  );

  const texts = useMemo(
    () => ({
      onTheAir: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_ON_THE_AIR_VIEW_ALL,
        ),
      },
      airingToday: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_AIRING_TODAY_VIEW_ALL,
        ),
      },
      popular: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_POPULAR_VIEW_ALL,
        ),
      },
      topRated: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_TV_SHOWS_TOP_RATED_VIEW_ALL,
        ),
      },
    }),
    [translations.translate],
  );

  const makeOnTheAirSection = useCallback(
    (data: SchemaTypes.TrendingTVShows_trendingTvShows_onTheAir_items[]) => ({
      sectionTitle: texts.onTheAir.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.onTheAir.viewAll,
          id: 'onTheAir',
          isMovie: false,
          data,
        }),
      id: 'onTheAir',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const makeAiringTodaySection = useCallback(
    (
      data: SchemaTypes.TrendingTVShows_trendingTvShows_airingToday_items[],
    ) => ({
      sectionTitle: texts.airingToday.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.airingToday.viewAll,
          id: 'airingToday',
          isMovie: false,
          data,
        }),
      id: 'airingToday',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const makePopularSection = useCallback(
    (data: SchemaTypes.TrendingTVShows_trendingTvShows_popular_items[]) => ({
      sectionTitle: texts.popular.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.popular.viewAll,
          id: 'popular',
          isMovie: false,
          data,
        }),
      id: 'popular',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const makeTopRatedSection = useCallback(
    (data: SchemaTypes.TrendingTVShows_trendingTvShows_topRated_items[]) => ({
      sectionTitle: texts.topRated.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.topRated.viewAll,
          id: 'topRated',
          isMovie: false,
          data,
        }),
      id: 'topRated',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const handleOnGetData = useCallback(
    (data: SchemaTypes.TrendingTVShows) => {
      handleSetTop3(data.trendingTvShows.onTheAir.items);
      const onTheAirSection = makeOnTheAirSection(
        data.trendingTvShows.onTheAir.items,
      );
      const airingToday = makeAiringTodaySection(
        data.trendingTvShows.airingToday.items,
      );
      const popularSection = makePopularSection(
        data.trendingTvShows.popular.items,
      );
      const topRated = makeTopRatedSection(data.trendingTvShows.topRated.items);
      setTrending([
        onTheAirSection,
        airingToday,
        popularSection,
        topRated,
      ] as Types.HomeSection[]);
    },
    [
      makeOnTheAirSection,
      makeAiringTodaySection,
      makePopularSection,
      makeTopRatedSection,
    ],
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
    isLoading: fetchTrendingTVShows.isLoading,
    hasError: fetchTrendingTVShows.hasError,
    exec: fetchTrendingTVShows.exec,
    data: trending,
    top3,
  };
};
