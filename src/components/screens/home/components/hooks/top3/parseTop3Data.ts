import {shuffleDataset} from '@utils';
import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

type TrendingItems = (
  | SchemaTypes.TrendingMovies_trendingMovies_nowPlaying_items
  | SchemaTypes.TrendingTVShows_trendingTvShows_onTheAir_items
) & {
  title?: string;
  name?: string;
};

const parseTop3Data = (
  trendingItems: TrendingItems[],
): Types.HomeTop3Item[] => {
  const top3Dataset = shuffleDataset<TrendingItems>(trendingItems);

  return top3Dataset.slice(0, 3).map((trendingItem: TrendingItems) => ({
    title: trendingItem.title || trendingItem.name,
    voteAverage: trendingItem.voteAverage,
    voteCount: trendingItem.voteCount,
    image: trendingItem.posterPath,
    genres: trendingItem.genreIds,
    id: trendingItem.id,
  }));
};

export default parseTop3Data;
