import gql from 'graphql-tag';

export const GET_TRENDING_TV_SHOWS = gql`
  fragment TrendingTVShow on BaseTVShow {
    voteAverage
    title: name
    posterPath
    voteCount
    genreIds
    id
  }

  query TrendingTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      onTheAir(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
      popular(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
      topRated(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
    }
  }
`;
