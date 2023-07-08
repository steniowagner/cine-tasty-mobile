import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

type BaseParams = {
  texts: Record<Types.TrendingTVShowsKeys, Record<string, string>>;
  onPressMediaItem: (item: Types.SimplifiedMedia) => void;
  onPressViewAll: (params: Types.PressViewAllParams) => void;
};

type MakeTrendingTVShowsSectionsParams = BaseParams & {
  data: SchemaTypes.TrendingTVShows;
};

type MakeTrendingTVShowsSectionParams = BaseParams & {
  id: Types.TrendingTVShowsKeys;
  tvShows: SchemaTypes.TrendingTVShow[];
};

const makeTrendingTVShowsSection = (
  params: MakeTrendingTVShowsSectionParams,
) => ({
  sectionTitle: params.texts[params.id].section,
  onPressItem: params.onPressMediaItem,
  onPressViewAll: () =>
    params.onPressViewAll({
      viewAllTitle: params.texts[params.id].viewAll,
      isMovie: false,
      id: params.id,
      data: params.tvShows,
    }),
  id: params.id,
  data: params.tvShows,
});

export const makeTrendingTVShowsSections = (
  params: MakeTrendingTVShowsSectionsParams,
) => {
  const baseParams = {
    onPressMediaItem: params.onPressMediaItem,
    onPressViewAll: params.onPressViewAll,
    texts: params.texts,
  };
  const onTheAirSection = makeTrendingTVShowsSection({
    ...baseParams,
    tvShows: params.data.trendingTvShows.onTheAir.items,
    id: 'onTheAir',
  });
  const airingToday = makeTrendingTVShowsSection({
    ...baseParams,
    tvShows: params.data.trendingTvShows.airingToday.items,
    id: 'airingToday',
  });
  const popularSection = makeTrendingTVShowsSection({
    ...baseParams,
    tvShows: params.data.trendingTvShows.popular.items,
    id: 'popular',
  });
  const topRated = makeTrendingTVShowsSection({
    ...baseParams,
    tvShows: params.data.trendingTvShows.topRated.items,
    id: 'topRated',
  });
  return [onTheAirSection, airingToday, popularSection, topRated];
};
