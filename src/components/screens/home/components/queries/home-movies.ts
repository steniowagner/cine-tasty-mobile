import gql from 'graphql-tag';

export const GET_TRENDING_MOVIES = gql`
  fragment TrendingMovie on BaseMovie {
    voteAverage
    posterPath
    voteCount
    title
    id
  }

  query TrendingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      nowPlaying(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
          genreIds
        }
      }
      popular(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
        }
      }
      topRated(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
        }
      }
      upcoming(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
        }
      }
    }
  }
`;
