import {OperationVariables} from '@apollo/client';
import { GraphQLError } from 'graphql';

import {GET_TV_SHOW_DETAIL} from '@graphql/queries';

import {randomPositiveNumber} from '../utils';

export const castTVShows = (size: number) => Array(size).fill({}).map((_, index) => ({
  __typename: 'CastTVShow',
  profilePath: `POSTER_PATH_${index}`,
  character: `CHARACTER_${index}`,
  name: `NAME_${index}`,
  id: index,
  voteAverage: index + 1,
  voteCount: index + 1,
}));

const tvShowCrew = (size: number) => Array(size).fill({}).map((_, index) => ({
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

    const similarTVShows = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'BaseTVShow',
      voteAverage: index,
      posterPath: `POSTER_PATH_${index}`,
      voteCount: index,
      name: `NAME_${index}`,
      id: index,
    }));

    const createdBy = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'Creator',
      profilePath: `PROFILE_PATH_${index}`,
      name: `NAME_${index}`,
      id: index,
    }));

    const networks = (length: number) => Array(length).fill({}).map((_, index) => ({
      __typename: 'Network',
      logoPath: `LOGO_PATH_${index}`,
      name: `NAME_${index}`,
      id: index,
    }));

  type Configuration = {
    castLength?: number,
    crewLenth?: number,
    genresLength?: number,
    imagesLength?: number,
    videosLength?: number,
    creatorsLength?: number,
    networksLenght?: number,
    productionCompanies?: number,
    reviewsLength?: number,
    similarLength?: number,
    voteAverage?: number,
    voteCount?: number,
    removeOriginalName?: boolean;
    removeNumberOfEpisodes?: boolean;
    removeNumberOfSeasons?: boolean;
    removeName?: boolean;
    removeOriginalLanguage?: boolean
    removeEpisodeRuntime?: boolean;
    removeOverview?: boolean
    removeOriginalCountry?: boolean;
    removeFirstAirDate?: boolean
    removeLastAirDate?: boolean
  }

  export const firstAirDate = '1994-02-21';

  export const lastAirDate = '1994-02-21';

export const tvShowsDetailsResolvers = (variables: OperationVariables, configuration: Configuration = {}) => {
  const request = {
    request: {
      query: GET_TV_SHOW_DETAIL,
      variables,
    },
  };
  const result = {
    result: {
      data: {
        tvShow: {
          genres: Array(configuration.genresLength >= 0 ? configuration.genresLength : randomPositiveNumber(10, 1)).fill('').map((_, index) => `GENRE_${index}`),
          voteAverage: configuration.voteAverage || 1,
          voteCount: configuration.voteCount || 1,
          images: Array(configuration.imagesLength >= 0  ? configuration.imagesLength : randomPositiveNumber(10, 1)).fill('').map((_, index) => `IMAGE_${index}`),
          backdropPath: 'BACKDROP_PATH',
          createdBy: createdBy(configuration.creatorsLength >= 0 ? configuration.creatorsLength : randomPositiveNumber(10, 1)),
          networks: networks(configuration.networksLenght >= 0 ? configuration.networksLenght : randomPositiveNumber(10, 1)),
          episodeRunTime: configuration.removeEpisodeRuntime ? [] : [randomPositiveNumber(10, 1)],
          firstAirDate: configuration.removeFirstAirDate ? '' : firstAirDate,
          lastAirDate: configuration.removeLastAirDate ? '' : lastAirDate,
          name: configuration.removeName ? '' : 'NAME',
          id: '1',
          productionCompanies: Array(randomPositiveNumber(10, 1)).fill({}).map((_, index) => ({
            __typename: 'ProductionCompany',
            id: `${index}`,
            logoPath: `LOGO_PATH_${index}`,
            name: `NAME_${index}`,
          })),
          originalLanguage: configuration.removeOriginalLanguage ? '' : 'EN',
          originalName: configuration.removeOriginalName ? '' : 'ORIGINAL_NAME',
          originCountry: configuration.removeOriginalCountry ? '' : ['BRAZEELLL'],
          overview: configuration.removeOverview ? '' : 'OVERVIEW',
          videos: videos(configuration.videosLength >= 0 ? configuration.videosLength : randomPositiveNumber(10, 1)),
          cast: castTVShows(configuration.castLength >= 0 ? configuration.castLength : randomPositiveNumber(10, 1)),
          crew: tvShowCrew(configuration.crewLenth >= 0 ? configuration.crewLenth : randomPositiveNumber(10, 1)),
          similar: similarTVShows(configuration.similarLength >= 0 ? configuration.similarLength : randomPositiveNumber(10, 1)),
          posterPath: 'POSTER_PATH',
          numberOfEpisodes: configuration.removeNumberOfEpisodes ? '' : randomPositiveNumber(10, 1),
          numberOfSeasons: configuration.removeNumberOfSeasons ? '' : randomPositiveNumber(10, 1),
          reviews: reviews(configuration.reviewsLength >= 0 ? configuration.reviewsLength : randomPositiveNumber(10, 1)),
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

export const makeQuerySuccessResolver = (variables: OperationVariables, configuration: Configuration = {}) => {
  const baseResolver = tvShowsDetailsResolvers(variables, configuration);
  return [{
    ...baseResolver.request,
    ...baseResolver.result,
  }];
};

export const makeQueryNetworkErrorResolver = (variables: OperationVariables, configuration: Configuration = {}) => {
  const baseResolver = tvShowsDetailsResolvers(variables, configuration);
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
};

export const makeQueryGraphQLErrorResolver = (variables: OperationVariables, configuration: Configuration = {}) => {
  const baseResolver = tvShowsDetailsResolvers(variables, configuration);
  return [{
    ...baseResolver.request,
    ...baseResolver.responseWithNetworkError,
  }];
};