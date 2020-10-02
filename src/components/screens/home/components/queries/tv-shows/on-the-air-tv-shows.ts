import gql from 'graphql-tag';

export const ON_THE_AIR_TV_SHOWS = gql`
  query OnTheAirTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      onTheAir(args: { page: $page, language: $language }) {
        hasMore
        items {
          title: name
          voteAverage
          posterPath
          voteCount
          genreIds
          id
        }
      }
    }
  }
`;
