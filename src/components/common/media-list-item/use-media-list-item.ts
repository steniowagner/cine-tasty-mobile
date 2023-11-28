import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import metrics from '@/styles/metrics';
import { Routes } from '@navigation';

import { LayoutSize, LAYOUT_MEASURES } from './MediaListItem.styles';

export type MediaType = 'MOVIE' | 'TV_SHOW';

type Navigation = StackNavigationProp<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Famous.MOVIE_DETAILS &
    Routes.Home.MOVIE_DETAILS &
    Routes.Famous.TV_SHOW_DETAILS &
    Routes.Home.TV_SHOW_DETAILS
>;

export type UseMediaListItemParams = {
  layoutSize: LayoutSize;
  voteAverage?: number | null;
  genres?: string[] | null;
  voteCount?: number | null;
  image?: string | null;
  title?: string | null;
  mediaType: MediaType;
  id?: number | null;
};

export const useMediaListItem = (params: UseMediaListItemParams) => {
  const navigation = useNavigation<Navigation>();

  const imageStyles = useMemo(
    () => ({
      width: LAYOUT_MEASURES[params.layoutSize].width,
      height: LAYOUT_MEASURES[params.layoutSize].height,
      marginBottom: metrics.sm,
      borderRadius: metrics.sm,
    }),
    [params.layoutSize],
  );

  const getMediaDetailsRoute = useCallback(() => {
    const routeName = navigation.getState().routes[0].name;
    const isHomeStack = /HOME/gi.test(routeName);
    if (isHomeStack) {
      return params.mediaType === 'MOVIE'
        ? Routes.Home.MOVIE_DETAILS
        : Routes.Home.TV_SHOW_DETAILS;
    }
    return params.mediaType === 'TV_SHOW'
      ? Routes.Famous.TV_SHOW_DETAILS
      : Routes.Famous.MOVIE_DETAILS;
  }, [params.mediaType, navigation]);

  const handlePressItem = useCallback(() => {
    const mediaDetailsRoute = getMediaDetailsRoute();
    navigation.push(mediaDetailsRoute, {
      voteAverage: params.voteAverage,
      genres: params.genres,
      image: params.image,
      voteCount: params.voteCount,
      title: params.title,
      id: params.id,
    });
  }, [getMediaDetailsRoute, params]);

  return {
    canShowVotesData:
      typeof params.voteAverage === 'number' &&
      typeof params.voteCount === 'number',
    onPressItem: handlePressItem,
    imageStyles,
  };
};
