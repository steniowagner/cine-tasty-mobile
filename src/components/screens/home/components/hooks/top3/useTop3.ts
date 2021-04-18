import { useCallback, useEffect, useState } from 'react';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import getTop3Data from './parseTop3Data';

type UseTop3Props = {
  trendingTVShows: SchemaTypes.TrendingTVShows;
  trendingMovies: SchemaTypes.TrendingMovies;
};

const useTop3 = ({ trendingTVShows, trendingMovies }: UseTop3Props) => {
  const [top3TVShows, setTop3TVShows] = useState<Types.HomeTop3Item[]>([]);
  const [top3Movies, setTop3Movies] = useState<Types.HomeTop3Item[]>([]);

  const onSetTop3Movies = useCallback(() => {
    if (top3Movies.length) {
      return;
    }

    const { nowPlaying } = trendingMovies.trendingMovies;

    const top3Result = getTop3Data(nowPlaying.items);

    setTop3Movies(top3Result);
  }, [trendingMovies]);

  useEffect(() => {
    if (trendingMovies) {
      onSetTop3Movies();
    }
  }, [trendingMovies]);

  const onSetTop3TVShows = useCallback(() => {
    if (top3TVShows.length) {
      return;
    }

    const { onTheAir } = trendingTVShows.trendingTvShows;

    const top3Result = getTop3Data(onTheAir.items);

    setTop3TVShows(top3Result);
  }, [trendingTVShows]);

  useEffect(() => {
    if (trendingTVShows) {
      onSetTop3TVShows();
    }
  }, [trendingTVShows]);

  return {
    top3TVShows,
    top3Movies,
  };
};

export default useTop3;
