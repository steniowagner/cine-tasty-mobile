import { TrendingTVShow, TrendingMovie } from 'types/schema';
import { SimplifiedMedia } from 'types';

type TrendingItems = (TrendingMovie | TrendingTVShow) & {
  title?: string;
  name?: string;
};

const parseTrendingToSimplifiedMedia = (
  trendingItems: TrendingItems[],
): SimplifiedMedia[] => trendingItems.map((trendingItem: TrendingItems) => ({
  ...trendingItem,
  title: trendingItem.title || trendingItem.name,
}));

export default parseTrendingToSimplifiedMedia;
