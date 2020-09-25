import {
  TrendingMovies_trendingMovies_nowPlaying_items as NowPlayingMovie,
  TrendingTVShows_trendingTvShows_onTheAir_items as OnTheAirTVShow,
} from 'types/schema';
import shuffleDataset from 'utils/shuffleDataset';
import { HomeTop3Item } from 'types';

type TrendingItems = (NowPlayingMovie | OnTheAirTVShow) & {
  title?: string;
  name?: string;
};

const parseTop3Data = (trendingItems: TrendingItems[]): HomeTop3Item[] => {
  const top3Dataset = shuffleDataset<TrendingItems>(trendingItems);

  return top3Dataset.slice(0, 3).map((trendingItem: TrendingItems) => ({
    title: trendingItem.title || trendingItem.name,
    voteAverage: trendingItem.voteAverage,
    image: trendingItem.posterPath,
    genres: trendingItem.genreIds,
    id: trendingItem.id,
  }));
};

export default parseTop3Data;
