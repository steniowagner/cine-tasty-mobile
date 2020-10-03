import gql from 'graphql-tag';

import TrendingMovieFragment from './trendingMovieFragment';

export const NOW_PLAYING_MOVIES = gql`
  ${TrendingMovieFragment}

  query NowPlayingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      nowPlaying(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;
