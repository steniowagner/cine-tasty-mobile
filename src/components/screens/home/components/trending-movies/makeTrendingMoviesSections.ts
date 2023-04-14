import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

type BaseParams = {
  texts: Record<Types.TrendingMoviesKeys, Record<string, string>>;
  onPressMediaItem: (item: Types.SimplifiedMedia) => void;
  onPressViewAll: (params: Types.PressViewAllParams) => void;
};

type MakeTrendingMoviesSectionsParams = BaseParams & {
  data: SchemaTypes.TrendingMovies;
};

type MakeTrendingMoviesSectionParams = BaseParams & {
  id: Types.TrendingMoviesKeys;
  movies: SchemaTypes.TrendingMovie[];
};

const makeTrendingMoviesSection = (
  params: MakeTrendingMoviesSectionParams,
) => ({
  sectionTitle: params.texts[params.id].section,
  onPressItem: params.onPressMediaItem,
  onPressViewAll: () =>
    params.onPressViewAll({
      viewAllTitle: params.texts[params.id].viewAll,
      isMovie: true,
      id: params.id,
      data: params.movies,
    }),
  id: params.id,
  data: params.movies,
});

export const makeTrendingMoviesSections = (
  params: MakeTrendingMoviesSectionsParams,
) => {
  const baseParams = {
    onPressMediaItem: params.onPressMediaItem,
    onPressViewAll: params.onPressViewAll,
    texts: params.texts,
  };
  const nowPlayingSection = makeTrendingMoviesSection({
    ...baseParams,
    movies: params.data.trendingMovies.nowPlaying.items,
    id: 'nowPlaying',
  });
  const popularSection = makeTrendingMoviesSection({
    ...baseParams,
    movies: params.data.trendingMovies.popular.items,
    id: 'popular',
  });
  const topRatedSection = makeTrendingMoviesSection({
    ...baseParams,
    movies: params.data.trendingMovies.topRated.items,
    id: 'topRated',
  });
  const upcomingSection = makeTrendingMoviesSection({
    ...baseParams,
    movies: params.data.trendingMovies.upcoming.items,
    id: 'upcoming',
  });
  return [nowPlayingSection, popularSection, topRatedSection, upcomingSection];
};
