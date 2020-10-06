import gql from 'graphql-tag';

import TrendingMovieFragment from './trendingMovieFragment';

export const TOP_RATED_MOVIES = gql`
  ${TrendingMovieFragment}

  query TrendingTopRatedMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      topRated(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;
