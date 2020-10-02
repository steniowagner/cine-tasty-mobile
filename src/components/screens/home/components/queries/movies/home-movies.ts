import gql from 'graphql-tag';

import TrendingMovie from './trendingMovieFragment';

export const GET_TRENDING_MOVIES = gql`
  ${TrendingMovie}

  query TrendingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      nowPlaying(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
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
