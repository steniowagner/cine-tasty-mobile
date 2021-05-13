import { useCallback, useEffect, useState } from 'react';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import getTop3Data from './parseTop3Data';

type UseTop3Props = {
  trendingTVShows: SchemaTypes.TrendingTVShows;
  trendingMovies: SchemaTypes.TrendingMovies;
};

const useTop3 = (props: UseTop3Props) => {
  const [top3TVShows, setTop3TVShows] = useState<Types.HomeTop3Item[]>([]);
  const [top3Movies, setTop3Movies] = useState<Types.HomeTop3Item[]>([]);

  const onSetTop3Movies = useCallback(() => {
    if (top3Movies.length) {
      return;
    }

    const { nowPlaying } = props.trendingMovies.trendingMovies;

    const top3Result = getTop3Data(nowPlaying.items);

    setTop3Movies(top3Result);
  }, [props.trendingMovies]);

  useEffect(() => {
    if (props.trendingMovies) {
      onSetTop3Movies();
    }
  }, [props.trendingMovies]);

  const onSetTop3TVShows = useCallback(() => {
    if (top3TVShows.length) {
      return;
    }

    const { onTheAir } = props.trendingTVShows.trendingTvShows;

    const top3Result = getTop3Data(onTheAir.items);

    setTop3TVShows(top3Result);
  }, [props.trendingTVShows]);

  useEffect(() => {
    if (props.trendingTVShows) {
      onSetTop3TVShows();
    }
  }, [props.trendingTVShows]);

  return {
    top3TVShows,
    top3Movies,
  };
};

export default useTop3;
