import gql from 'graphql-tag';

import TrendingTVShowFragment from './trendingTVShowFragment';

export const TOP_RATED_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingTopRatedTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      topRated(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;
