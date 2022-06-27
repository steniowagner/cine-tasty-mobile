import {useCallback, useEffect, useMemo, useState} from 'react';

import {GET_TRENDING_MOVIES} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';
import {useAlertMessage} from '@providers';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

import {HomeStackNavigationProp} from '../routes/route-params-types';
import {useFetchMediaTrending} from './useFetchMediaTrending';
import {getTop3} from './getTop3';

type UseTrendingMoviesProps = {
  onPressViewAll: (params: Types.PressViewAllParams) => void;
  navigation: HomeStackNavigationProp;
  isSelected: boolean;
};

export const useTrendingMovies = (props: UseTrendingMoviesProps) => {
  const [trending, setTrending] = useState<Types.HomeSection[]>([]);
  const [top3, setTop3] = useState<Types.HomeTop3Item[]>([]);

  const translations = useTranslations();
  const alertMessage = useAlertMessage();

  const handlePressMediaItem = useCallback(
    (item: Types.SimplifiedMedia) => {
      props.navigation.navigate(Routes.Movie.DETAILS, {
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
    [top3],
  );

  const texts = useMemo(
    () => ({
      nowPlaying: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL,
        ),
      },
      popular: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_POPULAR,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL,
        ),
      },
      topRated: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL,
        ),
      },
      upcoming: {
        section: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING,
        ),
        viewAll: translations.translate(
          Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL,
        ),
      },
    }),
    [translations.translate],
  );

  const makeNowPlayingSection = useCallback(
    (data: SchemaTypes.TrendingMovies_trendingMovies_nowPlaying_items[]) => ({
      sectionTitle: texts.nowPlaying.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.nowPlaying.viewAll,
          id: 'nowPlaying',
          isMovie: true,
          data,
        }),
      id: 'nowPlaying',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const makePopularSection = useCallback(
    (data: SchemaTypes.TrendingMovies_trendingMovies_popular_items[]) => ({
      sectionTitle: texts.popular.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.popular.viewAll,
          id: 'popular',
          isMovie: true,
          data,
        }),
      id: 'popular',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const makeTopRatedSection = useCallback(
    (data: SchemaTypes.TrendingMovies_trendingMovies_topRated_items[]) => ({
      sectionTitle: texts.topRated.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.topRated.viewAll,
          id: 'topRated',
          isMovie: true,
          data,
        }),
      id: 'topRated',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const makeUpcomingSection = useCallback(
    (data: SchemaTypes.TrendingMovies_trendingMovies_upcoming_items[]) => ({
      sectionTitle: texts.upcoming.section,
      onPressItem: handlePressMediaItem,
      onPressViewAll: () =>
        props.onPressViewAll({
          viewAllTitle: texts.upcoming.viewAll,
          id: 'upcoming',
          isMovie: true,
          data,
        }),
      id: 'upcoming',
      data,
    }),
    [handlePressMediaItem, props.onPressViewAll, texts],
  );

  const handleOnGetData = useCallback(
    (data: SchemaTypes.TrendingMovies) => {
      handleSetTop3(data.trendingMovies.nowPlaying.items);
      const nowPlayingSection = makeNowPlayingSection(
        data.trendingMovies.nowPlaying.items,
      );
      const popularSection = makePopularSection(
        data.trendingMovies.popular.items,
      );
      const topRatedSection = makeTopRatedSection(
        data.trendingMovies.topRated.items,
      );
      const upcomingSection = makeUpcomingSection(
        data.trendingMovies.upcoming.items,
      );
      setTrending([
        nowPlayingSection,
        popularSection,
        topRatedSection,
        upcomingSection,
      ] as Types.HomeSection[]);
    },
    [
      makeNowPlayingSection,
      makePopularSection,
      makeTopRatedSection,
      makeUpcomingSection,
      handleSetTop3,
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
      const message = translations.translate(
        Translations.Tags.HOME_TRENDING_MOVIES_ERROR,
      );
      alertMessage.show(message);
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
