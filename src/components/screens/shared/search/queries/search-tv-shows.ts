import gql from 'graphql-tag';

export const SEARCH_TV_SHOWS = gql`
  query SearchTVShow($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BaseTVShow {
          voteAverage
          posterPath
          genreIds
          name
          id
        }
      }
    }
  }
`;
