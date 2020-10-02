import gql from 'graphql-tag';

import TrendingMovie from './trendingMovieFragment';

export const NOW_PLAYING_MOVIES = gql`
  ${TrendingMovie}

  query NowPlayingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      nowPlaying(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovie
        }
      }
    }
  }
`;
