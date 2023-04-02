import * as SchemaTypes from '@schema-types';

export type MediaSectionViewAllData = TVShowTrendingData | MovieTrendingData;

export type MediaTrendingItem = TVShowTrendingItem | MovieTrendingItem;

export type TVShowTrendingData =
  | SchemaTypes.TrendingAiringTodayTVShows
  | SchemaTypes.TrendingOnTheAirTVShows
  | SchemaTypes.TrendingPopularTVShows
  | SchemaTypes.TrendingTopRatedTVShows;

export type TVShowTrendingItem =
  | SchemaTypes.TrendingAiringTodayTVShows_trendingTvShows_airingToday_items
  | SchemaTypes.TrendingOnTheAirTVShows_trendingTvShows_onTheAir_items
  | SchemaTypes.TrendingPopularTVShows_trendingTvShows_popular_items
  | SchemaTypes.TrendingTopRatedTVShows_trendingTvShows_topRated_items;

export type MovieTrendingData =
  | SchemaTypes.TrendingNowPlayingMovies
  | SchemaTypes.TrendingPopularMovies
  | SchemaTypes.TrendingTopRatedMovies
  | SchemaTypes.TrendingUpcomingMovies;

export type MovieTrendingItem =
  | SchemaTypes.TrendingNowPlayingMovies_trendingMovies_nowPlaying_items
  | SchemaTypes.TrendingPopularMovies_trendingMovies_popular_items
  | SchemaTypes.TrendingTopRatedMovies_trendingMovies_topRated_items
  | SchemaTypes.TrendingUpcomingMovies_trendingMovies_upcoming_items;

export type TrendingResult = {
  dataset: MediaTrendingItem[];
  hasMore: boolean;
};
