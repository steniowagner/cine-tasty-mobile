import { FAMOUS_DETAILS_QUERY } from '@/components/stacks/common-screens/famous-details/use-famous-details';
import { ISO6391Language } from '@/types/schema';
import { randomPositiveNumber } from './utils';
import { GraphQLError } from 'graphql';

const famous = {
  knownForDepartment: 'KNOWN_FOR_DEPARTMENT',
  placeOfBirth: 'PLACE_OF_BIRTH',
  biography: 'BIOGRAPHY',
  birthday: '1994-02-21',
  deathday: '???',
  images: Array(randomPositiveNumber(10, 1))
    .fill('')
    .map((_, index) => `IMAGE_${index}`),
  cast: {
    movies: Array(randomPositiveNumber(10, 1))
      .fill({})
      .map((_, index) => ({
        voteAverage: randomPositiveNumber(10, 1),
        posterPath: `POSTER_PATH_${index}`,
        voteCount: randomPositiveNumber(10, 1),
        title: `CAST_MOVIE_${index}`,
        id: index,
      })),
    tvShows: Array(randomPositiveNumber(10, 1))
      .fill({})
      .map((_, index) => ({
        voteAverage: randomPositiveNumber(10, 1),
        posterPath: `POSTER_PATH_${index}`,
        voteCount: randomPositiveNumber(10, 1),
        title: `CAST_TV_SHOW_${index}`,
        id: index,
      })),
  },
};

const baseMockFamousDetailsQueryResponse = (id: number) => {
  const request = {
    request: {
      query: FAMOUS_DETAILS_QUERY,
      variables: {
        language: ISO6391Language.en,
        id,
      },
    },
  };
  const result = {
    result: {
      data: {
        famous,
      },
    },
  };

  const responseWithNetworkError = {
    ...request,
    error: new Error('A Network error occurred'),
  };

  const responseWithGraphQLError = {
    ...request,
    errors: [new GraphQLError('A GraphQL error occurred')],
  };

  return {
    responseWithGraphQLError,
    responseWithNetworkError,
    request,
    result,
  };
};

export const mockQueryFamousDetailsSuccess = (id: number) => {
  const query = baseMockFamousDetailsQueryResponse(id);
  return [
    {
      ...query.request,
      ...query.result,
    },
  ];
};

export const mockQueryFamousDetailsError = (id: number) => {
  const query = baseMockFamousDetailsQueryResponse(id);
  const error = randomPositiveNumber(1) % 2 === 0 ? 'network' : 'graphql';
  const errorResponse =
    error === 'network'
      ? query.responseWithNetworkError
      : query.responseWithGraphQLError;
  return [
    {
      ...query.request,
      ...errorResponse,
    },
  ];
};
