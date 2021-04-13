import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

type TrendingItems = (SchemaTypes.TrendingMovie | SchemaTypes.TrendingTVShow) & {
  title?: string;
  name?: string;
};

const parseTrendingToSimplifiedMedia = (
  trendingItems: TrendingItems[],
): Types.SimplifiedMedia[] => trendingItems.map((trendingItem: TrendingItems) => ({
  ...trendingItem,
  title: trendingItem.title || trendingItem.name,
}));

export default parseTrendingToSimplifiedMedia;
