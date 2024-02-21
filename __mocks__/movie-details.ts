import { ISO6391Language } from '@/types/schema';

import { MOVIE_DETAILS_QUERY } from '@/components/stacks/common-screens/media-details/movie-details/screen/use-movie-details';
import { GraphQLError } from 'graphql';
import { randomPositiveNumber } from './utils';

export const movie = {
  genres: ['Ação', 'Aventura', 'Ficção científica'],
  voteAverage: 7.585,
  voteCount: 21116,
  images: [
    '/8BVSqAfU5knNkxyCH4JiANHwjeZ.jpg',
    '/kHOOnAj1X5lTfpsuBT3B5VjkpFL.jpg',
    '/kuHBltXHUzrrzSx2ziFLFQlGw5D.jpg',
    '/6HXqBOUgKOlFJyQAcr7Hs3sqsvF.jpg',
    '/tBPgGu6IfojK7k6XTFHRdrySgsh.jpg',
    '/7JFbgeEHCLSDMDRolcJUrKCINzw.jpg',
    '/xXyVDOMr26ypk1Q9d7n4p3VRB5X.jpg',
    '/kvcjKaF4Jpisan2qkwm9jPfDTda.jpg',
    '/d7JUIYh7tr6QQn4CbDUz5rO7aEs.jpg',
  ],
  backdropPath: '/nlCHUWjY9XWbuEUQauCBgnY8ymF.jpg',
  id: 76341,
  originalTitle: 'Mad Max: Fury Road',
  overview:
    'Em um mundo apocalíptico, Max Rockatansky acredita que a melhor forma de sobreviver é não depender de ninguém. Porém, após ser capturado pelo tirano Immortan Joe e seus rebeldes, Max se vê no meio de uma guerra mortal, iniciada pela imperatriz Furiosa que tenta salvar um grupo de garotas. Também tentando fugir, Max aceita ajudar Furiosa. Dessa vez, o tirano Joe está ainda mais implacável pois teve algo insubstituível roubado.',
  title: 'Mad Max: Estrada da Fúria',
  releaseDate: '2015-05-13',
  budget: 150000000,
  revenue: 378858340,
  spokenLanguages: ['English'],
  productionCountries: ['Australia', 'United States of America'],
  cast: [
    {
      image: null,
      name: 'Leroy Titus',
      id: 2954227,
      subText: 'Third Assistant Director',
    },
    {
      image: null,
      name: 'Brett Hodgkinson',
      id: 3116316,
      subText: 'Second Second Assistant Director',
    },
    {
      image: null,
      name: 'Lee-Roy Titus',
      id: 3122744,
      subText: 'Third Assistant Director',
    },
    {
      image: '/s1SjDSeN6Sov5BGveVPpDhI94S5.jpg',
      name: 'Hiroshi Mori',
      id: 3164019,
      subText: 'Visual Effects',
    },
    {
      image: null,
      name: 'Cuan Prytz',
      id: 3174030,
      subText: 'Second Assistant Director',
    },
    {
      image: null,
      name: 'Joe Cash',
      id: 3255103,
      subText: 'Props',
    },
    {
      image: null,
      name: 'Joy Hoes',
      id: 3792976,
      subText: 'Third Assistant Director',
    },
  ],
  videos: [
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/GOkSpvc_ZgY/default.jpg',
      },
      key: 'GOkSpvc_ZgY',
      id: '63d31494a410c8125be6f94a',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/LceTDmamtNs/default.jpg',
      },
      key: 'LceTDmamtNs',
      id: '63d3151d5a07f500869106e4',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/JhTzXoQ-vRc/default.jpg',
      },
      key: 'JhTzXoQ-vRc',
      id: '63d315becb71b800a10d923f',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/_9klHcXRdSs/default.jpg',
      },
      key: '_9klHcXRdSs',
      id: '63d3152de72fe800e9e6a1e7',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/_vuN-xdtZo4/default.jpg',
      },
      key: '_vuN-xdtZo4',
      id: '63d2e7ffcb71b800d43a5b39',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/GMJp5t05H8E/default.jpg',
      },
      key: 'GMJp5t05H8E',
      id: '63d2e821e72fe8008e616381',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/OACeTIzax_U/default.jpg',
      },
      key: 'OACeTIzax_U',
      id: '63d2e8354a52f800819c4166',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/ZwuDUpF_vxY/default.jpg',
      },
      key: 'ZwuDUpF_vxY',
      id: '63d2e8479f51af00829a84af',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/5UclL5X3RPU/default.jpg',
      },
      key: '5UclL5X3RPU',
      id: '63d2e7e7a410c811f9e068d5',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/j-DantYBIUM/default.jpg',
      },
      key: 'j-DantYBIUM',
      id: '63d2e80b5a07f5007b0b54d4',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/RQBcn4qUZVY/default.jpg',
      },
      key: 'RQBcn4qUZVY',
      id: '63d314f6e72fe8007ca46956',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/yeXNFgA-5Q0/default.jpg',
      },
      key: 'yeXNFgA-5Q0',
      id: '63d314d05a07f500a29773b3',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/UtlCycIMotk/default.jpg',
      },
      key: 'UtlCycIMotk',
      id: '63d315755a07f500dc9ea52b',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/GLZXsmqZPFg/default.jpg',
      },
      key: 'GLZXsmqZPFg',
      id: '63d314c65a07f50086910663',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/kqaJsU8i8bg/default.jpg',
      },
      key: 'kqaJsU8i8bg',
      id: '63d314bacb71b8008102c2a2',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/aXlfsF_lb0Y/default.jpg',
      },
      key: 'aXlfsF_lb0Y',
      id: '63d31635a410c811e9bf09d5',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/slTH9lFJjKU/default.jpg',
      },
      key: 'slTH9lFJjKU',
      id: '63d31435e72fe8008e6170e6',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/Bme58r4TIN0/default.jpg',
      },
      key: 'Bme58r4TIN0',
      id: '63d31628e72fe8007ca46afa',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/jWdVIqsT9hg/default.jpg',
      },
      key: 'jWdVIqsT9hg',
      id: '63d3160f5a07f500dc9ea5ee',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/ts94HEB7vHw/default.jpg',
      },
      key: 'ts94HEB7vHw',
      id: '63d3161666ae4d0096b736a4',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/zUtHFnJS3kw/default.jpg',
      },
      key: 'zUtHFnJS3kw',
      id: '63d3144a66ae4d00c1cf92ee',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/MonFNCgK4WE/default.jpg',
      },
      key: 'MonFNCgK4WE',
      id: '5bcd2702c3a3682863018582',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/hEJnMQG9ev8/default.jpg',
      },
      key: 'hEJnMQG9ev8',
      id: '5bcd26f9925141612a0157ce',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/Lnx_topfRXU/default.jpg',
      },
      key: 'Lnx_topfRXU',
      id: '63d31641a410c811e9bf09ed',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/QHI-7AwfrGo/default.jpg',
      },
      key: 'QHI-7AwfrGo',
      id: '63d315e4cb71b800a10d9274',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/vD1NxNloato/default.jpg',
      },
      key: 'vD1NxNloato',
      id: '63d315f566ae4d0084282f44',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/mX3q6YLmWvg/default.jpg',
      },
      key: 'mX3q6YLmWvg',
      id: '63d31605031a1d00892253c0',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/YWNWi-ZWL3c/default.jpg',
      },
      key: 'YWNWi-ZWL3c',
      id: '5bcd26ef9251416126015b7d',
    },
    {
      thumbnail: {
        extraSmall: 'https://img.youtube.com/vi/akX3Is3qBpw/default.jpg',
      },
      key: 'akX3Is3qBpw',
      id: '5bcd26e39251416131016aba',
    },
  ],
  similar: [
    {
      voteAverage: 6.8,
      posterPath: '/2X19EqWemFmUimlbqosJefuP9XH.jpg',
      voteCount: 42,
      title: 'Harrison Bergeron',
      id: 24732,
    },
    {
      voteAverage: 6.2,
      posterPath: '/tc01TDkZlzOr0TjM6hRlYV5pzo2.jpg',
      voteCount: 52,
      title: 'Viagem ao Grande Deserto',
      id: 24736,
    },
    {
      voteAverage: 5.139,
      posterPath: '/7BziQ3NHe18pD1hNPXjQZ4rKaMU.jpg',
      voteCount: 485,
      title: 'Ghostland: Terra Sem Lei',
      id: 523638,
    },
    {
      voteAverage: 6.796,
      posterPath: '/ihDJpDbKpVjxx9bzo9i6MdhS5dm.jpg',
      voteCount: 113,
      title: 'Feliz Coincidência',
      id: 22230,
    },
    {
      voteAverage: 6,
      posterPath: '/yiGBneH1tfJpj6100qFB18R0vCB.jpg',
      voteCount: 233,
      title: 'Excesso de Bagagem',
      id: 26180,
    },
  ],
  crew: [
    {
      name: 'Iain Smith',
      job: 'Executive Producer',
      profilePath: '/fqQ5qm1Lw6nyFIjcgDL3DguoUPl.jpg',
      id: 8374,
    },
    {
      name: 'Mark A. Mangini',
      job: 'Supervising Sound Editor',
      profilePath: '/q2LCMIFYJZlZtSCIJjwS8zfAnfE.jpg',
      id: 8376,
    },
    {
      name: 'Bruce Berman',
      job: 'Executive Producer',
      profilePath: '/qMVfprJJgjC04fWKdyN9poIWysZ.jpg',
      id: 1296,
    },
    {
      name: 'John Seale',
      job: 'Director of Photography',
      profilePath: '/zXPBy00hdpW41TAtvxPnJP2NxbB.jpg',
      id: 2702,
    },
    {
      name: 'Dean Semler',
      job: 'Thanks',
      profilePath: '/6GewzjGfuCc6fsf4f2ZsmDWp4Dl.jpg',
      id: 4501,
    },
  ],
};

type MockMovieDetailsQueryResponseParams = {
  includeVoteAverage: boolean;
  includeGenres: boolean;
  includeVoteCount: boolean;
  id: number;
};

const baseMockMovieDetailsQueryResponse = (
  params: MockMovieDetailsQueryResponseParams,
) => {
  const request = {
    request: {
      query: MOVIE_DETAILS_QUERY,
      variables: {
        language: ISO6391Language.en,
        ...params,
      },
    },
  };

  const result = {
    result: {
      data: {
        movie,
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

export const mockQueryMovieDetailsSuccess = (
  params: MockMovieDetailsQueryResponseParams,
) => {
  const query = baseMockMovieDetailsQueryResponse(params);
  return [
    {
      ...query.request,
      ...query.result,
    },
  ];
};

export const mockQueryMovieDetailsError = (id: number) => {
  const query = baseMockMovieDetailsQueryResponse({
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
