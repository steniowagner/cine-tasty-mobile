export const trendingTVShowsItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((__, genreIndex) => `genre-${genreIndex}`),
    posterPath: `/posterPath-${index}`,
    __typename: 'BaseTVShow',
    name: `name-${index}`,
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

export const trendingTVShowsItemsWithTitle = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((__, genreIndex) => `genre-${genreIndex}`),
    posterPath: `/posterPath-${index}`,
    __typename: 'BaseTVShow',
    title: `name-${index}`,
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

export const trendingTVShowsWithTitle = {
  onTheAir: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  airingToday: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItemsWithTitle,
    __typename: 'TrendingTVShowsQueryResult',
  },
  __typename: 'TrendingTVShows',
};

export const trendingTVShows = {
  onTheAir: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  airingToday: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingTVShowsItems,
    __typename: 'TrendingTVShowsQueryResult',
  },
  __typename: 'TrendingTVShows',
};
