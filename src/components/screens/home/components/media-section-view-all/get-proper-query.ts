import * as Types from 'types';

export const getMovieProperQuery = (
  trendingMovieKey: Types.TrendingMediaItemKey,
): Types.CineTastyQuery => {
  const movieTrendingsMapping: Record<Types.TrendingMoviesKeys, Types.CineTastyQuery> = {
    nowPlaying: 'now_playing_movies',
    popular: 'popular_movies',
    topRated: 'top_rated_movies',
    upcoming: 'upcoming_movies',
  };

  return movieTrendingsMapping[trendingMovieKey];
};

export const getTVShowProperQuery = (
  trendingMovieKey: Types.TrendingMediaItemKey,
): Types.CineTastyQuery => {
  const tvShowTrendingsMapping: Record<
    Types.TrendingTVShowsKeys,
    Types.CineTastyQuery
  > = {
    airingToday: 'airing_today_tv_shows',
    onTheAir: 'on_the_air_tv_shows',
    popular: 'popular_tv_shows',
    topRated: 'top_rated_tv_shows',
  };

  return tvShowTrendingsMapping[trendingMovieKey];
};
