import * as Types from '@local-types';

import {handleOnGetTVShowsData} from './handleOnGetTVShowsData';
import {handleOnGetMoviesData} from './handleOnGetMoviesData';
import {TVShowTrendingData, MovieTrendingData} from './types';

type HandleOnGetDataParams = {
  trendingMediaItemKey: Types.TrendingMediaItemKey;
  data: TVShowTrendingData | MovieTrendingData;
  isMovie: boolean;
};

export const handleOnGetData = (params: HandleOnGetDataParams) =>
  params.isMovie
    ? handleOnGetMoviesData(params.trendingMediaItemKey)(
        params.data as MovieTrendingData,
      )
    : handleOnGetTVShowsData(params.trendingMediaItemKey)(
        params.data as TVShowTrendingData,
      );
