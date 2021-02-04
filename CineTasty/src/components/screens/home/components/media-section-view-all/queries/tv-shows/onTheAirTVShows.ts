import gql from 'graphql-tag';

import TrendingTVShowFragment from './trendingTVShowFragment';

export const ON_THE_AIR_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingOnTheAirTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      onTheAir(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;
