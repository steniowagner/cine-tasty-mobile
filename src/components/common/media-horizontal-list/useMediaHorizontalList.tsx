import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {FamousNavigationProp} from '@components/screens/famous/routes/route-params-types';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';

type MovieItem = SchemaTypes.GetFamousDetail_person_moviesCast;

type TVShowItem = SchemaTypes.GetFamousDetail_person_tvCast;

export type MediaHorizontalItem = MovieItem | TVShowItem;

type MediaType = 'MOVIE' | 'TV_SHOW';

type MediaItem = {
  voteAverage: number;
  posterPath: string;
  voteCount: number;
  title: string;
  id: number;
};

export type UseMediaHorizontalList = {
  dataset: MediaHorizontalItem[];
  type: MediaType;
};

const useMediaHorizontalList = (props: UseMediaHorizontalList) => {
  const navigation = useNavigation<FamousNavigationProp>();

  const handlePressItem = useCallback(
    (item: MediaItem) => {
      const route =
        props.type === 'MOVIE' ? Routes.Movie.DETAILS : Routes.TVShow.DETAILS;
      navigation.push(route, {
        voteAverage: item.voteAverage,
        posterPath: item.posterPath,
        voteCount: item.voteCount,
        title: item.title,
        id: item.id,
      });
    },
    [props.type],
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
    [props.dataset],
  );

  return {
    handlePressItem,
    dataset,
  };
};

export default useMediaHorizontalList;
