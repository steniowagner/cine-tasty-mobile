import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {getRouteName as getMoviesDetailsRouteName} from '@src/components/screens/common/media-details/movie-details/routes/route-params-types';
import {getRouteName as getTVShowsDetailsRouteName} from '@src/components/screens/common/media-details/tv-show-detail/routes/route-params-types';
import {FamousStackRoutes} from '@src/components/screens/famous/routes/route-params-types';
import {HomeStackRoutes} from '@src/components/screens/home/routes/route-params-types';
import {StackNavigationProp} from '@react-navigation/stack';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';

type MovieItem = SchemaTypes.GetFamousDetail_person_moviesCast;

type TVShowItem = SchemaTypes.GetFamousDetail_person_tvCast;

export type MediaHorizontalItem = MovieItem | TVShowItem;

export type MediaItem = {
  voteAverage: number;
  posterPath: string;
  voteCount: number;
  title: string;
  id: number;
};

type FamousMediaDetailsRoutes =
  | Routes.Famous.TV_SHOW_DETAILS
  | Routes.Famous.MOVIE_DETAILS;

type FamousMediaDetailsParams = Pick<
  FamousStackRoutes,
  FamousMediaDetailsRoutes
>;

type HomeMediaDetailsRoutes =
  | Routes.Home.TV_SHOW_DETAILS
  | Routes.Home.MOVIE_DETAILS;

type HomeMediaDetailsParams = Pick<HomeStackRoutes, HomeMediaDetailsRoutes>;

type Navigation = StackNavigationProp<
  FamousMediaDetailsParams & HomeMediaDetailsParams,
  HomeMediaDetailsRoutes | FamousMediaDetailsRoutes
>;

type MediaType = 'MOVIE' | 'TV_SHOW';

export type UseMediaHorizontalListProps = {
  dataset: MediaHorizontalItem[];
  type: MediaType;
};

export const useMediaHorizontalList = (props: UseMediaHorizontalListProps) => {
  const navigation = useNavigation<Navigation>();

  const getMediaRoute = useCallback(() => {
    const getRouteName =
      props.type === 'MOVIE'
        ? getMoviesDetailsRouteName
        : getTVShowsDetailsRouteName;
    return getRouteName(navigation.getState().routes[0].name);
  }, [props.type, navigation]);

  const handlePressItem = useCallback(
    (item: MediaItem) => {
      const route = getMediaRoute();
      navigation.push(route, {
        voteAverage: item.voteAverage,
        posterPath: item.posterPath,
        voteCount: item.voteCount,
        title: item.title,
        id: item.id,
      });
    },
    [navigation, getMediaRoute],
  );

  const dataset = useMemo(
    () =>
      props.dataset.map(item => ({
        title:
          props.type === 'MOVIE'
            ? (item as MovieItem).title
            : (item as TVShowItem).name,
        voteAverage: item.voteAverage,
        posterPath: item.posterPath,
        voteCount: item.voteCount,
        id: item.id,
      })),
    [props.dataset, props.type],
  );

  return {
    onPressItem: handlePressItem,
    dataset,
  };
};
