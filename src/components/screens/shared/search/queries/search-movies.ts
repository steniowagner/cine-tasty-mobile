import gql from 'graphql-tag';

export const SEARCH_MOVIES = gql`
  query SearchMovie($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BaseMovie {
          voteAverage
          posterPath
          genreIds
          title
          id
        }
      }
    }
  }
`;
