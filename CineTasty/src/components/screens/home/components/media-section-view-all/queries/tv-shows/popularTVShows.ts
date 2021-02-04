import gql from 'graphql-tag';

import TrendingTVShowFragment from './trendingTVShowFragment';

export const POPULAR_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingPopularTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      popular(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;
