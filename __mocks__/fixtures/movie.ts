import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {GET_MOVIE_DETAIL} from '@graphql/queries';

import {randomPositiveNumber} from '../utils';

export const trendingMoviesItems = Array(10)
  .fill({})
  .map((_, index) => ({
    genreIds: Array(index + 1)
      .fill('')
      .map((__, genreIndex) => `genre-${genreIndex}`),
    posterPath: `/posterPath-${index}`,
    title: `title-${index}`,
    __typename: 'BaseMovie',
    voteAverage: index,
    voteCount: index,
    id: index,
  }));

export const trendingMovies = {
  nowPlaying: {
    totalResults: 1,
    totalPages: 2,
    hasMore: true,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  popular: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  topRated: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  upcoming: {
    totalResults: 1,
    totalPages: 1,
    hasMore: false,
    items: trendingMoviesItems,
    __typename: 'TrendingMoviesQueryResult',
  },
  __typename: 'TrendingMovies',
};

export const castMovies = (size: number) => Array(size).fill({}).map((_, index) => ({
  __typename: 'CastMovie',
  profilePath: `POSTER_PATH_${index}`,
  character: `CHARACTER_${index}`,
  name: `NAME_${index}`,
  id: index,
}));

const movieCrew = (size: number) => Array(size).fill({}).map((_, index) => ({
  __typename: 'CrewItem',
  profilePath: `POSTER_PATH_${index}`,
  name: `NAME_${index}`,
  job: `JOB_${index}`,
  id: index,
}))

const videos = (length: number) =>
Array(length)
  .fill({})
  .map((_, index) => ({
    __typename: 'MediaVideo',
    thumbnail: {
      extraSmall: 'EXTRA_SMALL_THUMBNAIL',
    },
    key: `KEY_${index}`,
    id: `ID_${index}`,
  }));

  const reviews = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'Review',
      author: `AUTHOR_${index}`,
      content: `CONTENT_${index}`,
      id: `ID_${index}`,
    }));

    const similarMovies = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'BaseMovie',
      voteAverage: index,
      posterPath: `POSTER_PATH_${index}`,
      voteCount: index,
      title: `TITLE_${index}`,
      id: index,
    }));

  type Configuration = {
    castLength?: number,
    crewLenth?: number,
    genresLength?: number,
    imagesLength?: number,
    videosLength?: number,
    productionCompanies?: number,
    reviewsLength?: number,
    similarLength?: number,
    voteAverage?: number,
    voteCount?: number,
    removeOriginalTitle?: boolean;
    removeSpokenLanguages?: boolean
    removeProductionCountries?: boolean
    removeOverview?: boolean
  }

  export const releaseDate = '1994-02-21';

export const movieDetailsResolvers = (variables: OperationVariables, configuration: Configuration = {}) => {
  const request = {
    request: {
      query: GET_MOVIE_DETAIL,
      variables,
    },
  };
  const result = {
    result: {
      data: {
        movie: {
          genres: Array(configuration.genresLength >= 0 ? configuration.genresLength : randomPositiveNumber(10, 1)).fill('').map((_, index) => `GENRE_${index}`),
          voteAverage: configuration.voteAverage || 1,
          voteCount: configuration.voteCount || 1,
          images: Array(configuration.imagesLength >= 0  ? configuration.imagesLength : randomPositiveNumber(10, 1)).fill('').map((_, index) => `IMAGE_${index}`),
          backdropPath: 'BACKDROP_PATH',
          id: '1',
          originalTitle: configuration.removeOriginalTitle ? '' : 'ORIGINAL_TITLE',
          overview: configuration.removeOverview ? '' : 'OVERVIEW',
          title: 'TITLE',
          releaseDate,
          productionCompanies: Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
            __typename: 'ProductionCompany',
            id: `${index}`,
            logoPath: `LOGO_PATH_${index}`,
            name: `NAME_${index}`,
          })),
          budget: randomPositiveNumber(10, 1),
          revenue: randomPositiveNumber(10, 1),
          spokenLanguages:  Array(configuration.removeSpokenLanguages ? 0 : randomPositiveNumber(10, 1)).fill('').map((_, index) => `LANGUAGE_${index}`),
          productionCountries: Array(configuration.removeProductionCountries ? 0 : randomPositiveNumber(10, 1)).fill('').map((_, index) => `PRODUCTION_COUNTRY_${index}`),
          cast: castMovies(configuration.castLength >= 0 ? configuration.castLength : randomPositiveNumber(10, 1)),
          crew: movieCrew(configuration.crewLenth >= 0 ? configuration.crewLenth : randomPositiveNumber(10, 1)),
          videos: videos(configuration.videosLength >= 0 ? configuration.videosLength : randomPositiveNumber(10, 1)),
          reviews: reviews(configuration.reviewsLength >= 0 ? configuration.reviewsLength : randomPositiveNumber(10, 1)),
          similar: similarMovies(configuration.similarLength >= 0 ? configuration.similarLength : randomPositiveNumber(10, 1)),
        },
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
