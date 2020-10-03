import gql from 'graphql-tag';

import TrendingMovieFragment from './trendingMovieFragment';

export const POPULAR_MOVIES = gql`
  ${TrendingMovieFragment}

  query TrendingPopularMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      popular(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;
