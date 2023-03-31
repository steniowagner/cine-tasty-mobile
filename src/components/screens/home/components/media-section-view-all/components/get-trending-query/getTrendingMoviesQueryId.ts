import * as Types from '@local-types';

export const getTrendingMoviesQueryId = (
  trendingMovieKey: Types.TrendingMediaItemKey,
): Types.CineTastyQuery => {
  const trendingsQueryMapping: Record<
    Types.TrendingMoviesKeys,
    Types.CineTastyQuery
  > = {
    nowPlaying: 'now_playing_movies',
    popular: 'popular_movies',
    topRated: 'top_rated_movies',
    upcoming: 'upcoming_movies',
  };
  return trendingsQueryMapping[trendingMovieKey];
};
