import gql from 'graphql-tag';

export const SEARCH_PERSON = gql`
  query SearchPerson($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BasePerson {
          image: profilePath
          title: name
          id
        }
      }
    }
  }
`;
