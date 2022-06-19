import {useCallback, useEffect, useState} from 'react';

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

  const handlePressViewAll = useCallback(
    (id: Types.TrendingMoviesKeys) => {
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
        isMovie: true,
      });
    },
    [props.navigation, trending],
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

  const handleOnGetData = useCallback(
    (data: SchemaTypes.TrendingMovies) => {
      handleSetTop3(data.trendingMovies.nowPlaying.items);
      setTrending([
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_NOW_PLAYING,
          ),
          id: 'nowPlaying',
          data: data.trendingMovies.nowPlaying.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('nowPlaying'),
        },
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_POPULAR_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_POPULAR,
          ),
          id: 'popular',
          data: data.trendingMovies.popular.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('popular'),
        },
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_TOP_RATED,
          ),
          id: 'topRated',
          data: data.trendingMovies.topRated.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('topRated'),
        },
        {
          viewAllTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING_VIEW_ALL,
          ),
          sectionTitle: translations.translate(
            Translations.Tags.HOME_TRENDING_MOVIES_UPCOMING,
          ),
          id: 'upcoming',
          data: data.trendingMovies.upcoming.items,
          onPressItem: handlePressMediaItem,
          onPressViewAll: () => handlePressViewAll('upcoming'),
        },
      ]);
    },
    [translations],
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
