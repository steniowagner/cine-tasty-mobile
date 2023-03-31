import * as Types from '@local-types';

export const getTrendingTVShowsQueryId = (
  trendingMovieKey: Types.TrendingMediaItemKey,
): Types.CineTastyQuery => {
  const trendingsQueryMapping: Record<
    Types.TrendingTVShowsKeys,
    Types.CineTastyQuery
  > = {
    airingToday: 'airing_today_tv_shows',
    onTheAir: 'on_the_air_tv_shows',
    popular: 'popular_tv_shows',
    topRated: 'top_rated_tv_shows',
  };
  return trendingsQueryMapping[trendingMovieKey];
};
