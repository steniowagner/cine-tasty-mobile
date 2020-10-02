import gql from 'graphql-tag';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TrendingTVShow from './trendingTVShowFragment';

export const GET_TRENDING_TV_SHOWS = gql`
  ${TrendingTVShow}

  query TrendingTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      onTheAir(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
      popular(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
      topRated(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
    }
  }
`;
