import { GraphQLError } from 'graphql';

import { TV_SHOW_DETAILS_QUERY } from '@/components/stacks/common-screens/media-details/tv-show-details/screen/use-tv-show-detailts';
import { ISO6391Language } from '@/types/schema';

import { randomPositiveNumber } from './utils';

export const tvShow = {
  genres: ['Sci-Fi & Fantasy', 'Drama', 'Action & Adventure'],
  voteAverage: 8.436,
  voteCount: 3519,
  images: [
    '/8Mrd6mUCfczEMIYEg8BeeT1mNuv.jpg',
    '/lpdzTdAkspzmvrkKeTJoIjlPh16.jpg',
    '/9RoQp7UFHE8yBGGatr8igTydw6O.jpg',
    '/ywbHCgCYJAudhm0fwUC25J2WRz1.jpg',
    '/s6LQdnexGmxf8fCQWuQQqurwelo.jpg',
    '/iiIo1Vzow1Fqe2FUjQH3OweFVJ3.jpg',
    '/fU4gOMXkR7wMeDCMMirn4zfiefC.jpg',
  ],
  createdBy: [
    {
      image: '/1A7W0L9dZz0rCN1oj6h8YUvusdN.jpg',
      name: 'George R. R. Martin',
      id: 237053,
    },
    {
      image: '/ohS1LQEw1aYccD6mxUhWGXc7glz.jpg',
      name: 'Ryan Condal',
      id: 1167458,
    },
  ],
  episodeRunTime: [50],
  firstAirDate: '2022-08-21',
  lastAirDate: '2022-10-23',
  title: 'House of the Dragon',
  id: 94997,
  originalLanguage: 'en',
  originalName: 'House of the Dragon',
  originCountry: ['US'],
  overview:
    'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
  videos: [
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/TRhmCMkH7G4/default.jpg',
      },
      key: 'TRhmCMkH7G4',
      id: '655ce7397f054018d5189097',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/dGuhZnm8OOU/default.jpg',
      },
      key: 'dGuhZnm8OOU',
      id: '655ce745109230011b45ca5d',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/GYPenAJGVMs/default.jpg',
      },
      key: 'GYPenAJGVMs',
      id: '655ce756ea84c710922b55a3',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/aoPsQgJgkgo/default.jpg',
      },
      key: 'aoPsQgJgkgo',
      id: '648637a1028f1400aecef5f9',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/l9vfyN1LltY/default.jpg',
      },
      key: 'l9vfyN1LltY',
      id: '630f4c4fbe55b70083c5e6ed',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/blHoET7H0TY/default.jpg',
      },
      key: 'blHoET7H0TY',
      id: '62fe5b597cffda007e4e12d0',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/6BwpPql29a0/default.jpg',
      },
      key: '6BwpPql29a0',
      id: '62f9f8a77eb5f2007bcd04d1',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/DotnJ7tTA34/default.jpg',
      },
      key: 'DotnJ7tTA34',
      id: '62d838996f31af004d1f53f8',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/jwroDWGHwy4/default.jpg',
      },
      key: 'jwroDWGHwy4',
      id: '62de09509f5dfb00556d891b',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/Wg86eQkdudI/default.jpg',
      },
      key: 'Wg86eQkdudI',
      id: '6274010229c62639cd6f3cf2',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/fNwwt25mheo/default.jpg',
      },
      key: 'fNwwt25mheo',
      id: '615c1d0ad1444300436234ae',
    },
  ],
  cast: [
    {
      image: '/ox47FvHmHMZet0TOoDSJlQol9Ir.jpg',
      subText: 'Princess Rhaenyra Targaryen',
      name: "Emma D'Arcy",
      id: 2121005,
    },
    {
      image: '/yZNcUEqmvDJQQ7avMfJfCh7sVk9.jpg',
      subText: 'Alicent Hightower',
      name: 'Olivia Cooke',
      id: 1173984,
    },
    {
      image: '/uIKOm4w2wtUegxratSHj2KPFF7i.jpg',
      subText: 'King Viserys I Targaryen',
      name: 'Paddy Considine',
      id: 14887,
    },
    {
      image: '/xr2GSp8Pm6fT5VGm0I9tsWVcZ8q.jpg',
      subText: 'Prince Daemon Targaryen',
      name: 'Matt Smith',
      id: 136532,
    },
    {
      image: '/g8EUs8r1ECh9plKtrxBparsxlZ1.jpg',
      subText: 'Ser Otto Hightower',
      name: 'Rhys Ifans',
      id: 7026,
    },
  ],
  crew: [
    {
      image: null,
      name: 'Richard Sharkey',
      id: 1105636,
      subText: 'Consulting Producer',
    },
    {
      image: null,
      name: 'Jim Clay',
      id: 1253,
      subText: 'Production Design',
    },
    {
      image: null,
      name: 'Tim Porter',
      id: 1432103,
      subText: 'Co-Producer',
    },
    {
      image: '/wbT1bFGQAuqgVbXfQdlxWRBIqDD.jpg',
      name: 'Kate Rhodes James',
      id: 62257,
      subText: 'Casting',
    },
    {
      image: null,
      name: 'Angus Bickerton',
      id: 15883,
      subText: 'Visual Effects Supervisor',
    },
    {
      image: '/1G8TxAQnndnY5CLqVApBQ8RUT4A.jpg',
      name: 'Jany Temime',
      id: 11227,
      subText: 'Costume Designer',
    },
    {
      image: '/1A7W0L9dZz0rCN1oj6h8YUvusdN.jpg',
      name: 'George R. R. Martin',
      id: 237053,
      subText: 'Book',
    },
    {
      image: '/gof8bWW9E7MH30GpvA97PwGiIuu.jpg',
      name: 'Kelly Reilly',
      id: 17521,
      subText: 'Acting Double',
    },
  ],
  similar: [
    {
      voteAverage: 7,
      posterPath: '/b0HkkISlAxYZceH5RVAUCBcsryg.jpg',
      voteCount: 1,
      title: 'Fearless',
      id: 289,
    },
  ],
  numberOfEpisodes: 10,
  numberOfSeasons: 1,
};

type MockTVShowDetailsQueryResponseParams = {
  includeVoteAverage: boolean;
  includeGenres: boolean;
  includeVoteCount: boolean;
  id: number;
};

const baseMockTVShowDetailsQueryResponse = (
  params: MockTVShowDetailsQueryResponseParams,
) => {
  const request = {
    request: {
      query: TV_SHOW_DETAILS_QUERY,
      variables: {
        language: ISO6391Language.en,
        ...params,
      },
    },
  };

  const result = {
    result: {
      data: {
        tvShow,
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

export const mockQueryTVShowDetailsSuccess = (
  params: MockTVShowDetailsQueryResponseParams,
) => {
  const query = baseMockTVShowDetailsQueryResponse(params);
  return [
    {
      ...query.request,
      ...query.result,
    },
  ];
};

export const mockQueryTVShowDetailsError = (id: number) => {
  const query = baseMockTVShowDetailsQueryResponse({
    includeVoteAverage: false,
    includeGenres: false,
    includeVoteCount: false,
    id,
  });
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
