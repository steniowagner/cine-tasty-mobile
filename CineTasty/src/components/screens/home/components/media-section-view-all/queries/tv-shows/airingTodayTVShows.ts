import gql from 'graphql-tag';

import TrendingTVShowFragment from './trendingTVShowFragment';

export const AIRING_TODAY_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingAiringTodayTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      airingToday(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;
