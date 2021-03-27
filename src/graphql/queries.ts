import gql from 'graphql-tag';

import { CineTastyQuery } from 'types';

export const SEARCH_TV_SHOWS = gql`
  query SearchTVShow($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BaseTVShow {
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

export const SEARCH_MOVIES = gql`
  query SearchMovie($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BaseMovie {
          voteAverage
          posterPath
          voteCount
          genreIds
          title
          id
        }
      }
    }
  }
`;

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

export const getQuery = (queryId: CineTastyQuery) => {
  switch (queryId) {
    case 'search_tv':
      return SEARCH_TV_SHOWS;
    case 'search_movie':
      return SEARCH_MOVIES;
    case 'search_famous':
      return SEARCH_PERSON;
    default:
      return undefined;
  }
};
