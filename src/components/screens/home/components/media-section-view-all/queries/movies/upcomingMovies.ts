import gql from 'graphql-tag';

import TrendingMovieFragment from './trendingMovieFragment';

export const UPCOMING_MOVIES = gql`
  ${TrendingMovieFragment}

  query TrendingUpcomingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      upcoming(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;
