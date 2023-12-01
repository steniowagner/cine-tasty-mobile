import { GraphQLError } from 'graphql';

import { TV_SHOW_SEASON_QUERY } from '@/components/stacks/common-screens/tv-show-season/screen/use-tv-show-season';
import { ISO6391Language } from '@/types/schema';

import { randomPositiveNumber } from './utils';

export const tvShowSeason = {
  episodes: [
    {
      id: 1971015,
      name: 'Os Herdeiros do Dragão',
      overview:
        'Viserys organiza um torneio para comemorar o nascimento de seu segundo filho. Rhaenyra recebe seu tio Daemon na Fortaleza Vermelha.',
      stillPath: '/3V447myclihccqnSiVFVdlnNjZs.jpg',
      voteAverage: 7.872,
      voteCount: 109,
    },
    {
      id: 3846963,
      name: 'O Príncipe Canalha',
      overview:
        'Rhaenyra se excede no Pequeno Conselho. Viserys é aconselhado a garantir a sucessão através do casamento. Daemon anuncia suas intenções.',
      stillPath: '/uyWlPCKMPcjxjiKY6xFKtdbkFSR.jpg',
      voteAverage: 7.725,
      voteCount: 80,
    },
    {
      id: 3846964,
      name: 'Segundo de Seu Nome',
      overview:
        'Daemon e a Serpente Marinha lutam contra o Engorda Caranguejos. O reino celebra o segundo dia do nome de Aegon. Rhaenyra enfrenta a possibilidade de um casamento.',
      stillPath: '/fP1HCPFgwfXCcGHhjhgf0sndWAH.jpg',
      voteAverage: 7.857,
      voteCount: 70,
    },
    {
      id: 3846965,
      name: 'Rei do Mar Estreito',
      overview:
        'Depois que Rhaenyra interrompe sua turnê por Westeros, Daemon apresenta a princesa à Rua da Seda após o anoitecer.',
      stillPath: '/mW2a20R8VZqENHAmz47x21FCoYV.jpg',
      voteAverage: 7.581,
      voteCount: 62,
    },
    {
      id: 3846967,
      name: 'Iluminamos o Caminho',
      overview:
        'Daemon visita sua esposa no Vale. Viserys e Rhaenyra negociam acordos com os Velaryon. Alicent busca a verdade sobre a princesa.',
      stillPath: '/xee6kQm6uMiGKHMCKZpFGVIAGe7.jpg',
      voteAverage: 7.656,
      voteCount: 61,
    },
    {
      id: 3846970,
      name: 'A Princesa e a Rainha',
      overview:
        'Dez anos depois, Rhaenyra lida com as constantes especulações de Alicent sobre seus filhos. Enquanto isso, Daemon e Laena avaliam uma oferta em Pentos.',
      stillPath: '/lcBTDoCkBTJAdi8VagMQdzB6RYi.jpg',
      voteAverage: 7.5,
      voteCount: 62,
    },
    {
      id: 3846973,
      name: 'Driftmark',
      overview:
        'Enquanto as famílias se reúnem em Driftmark para um funeral, Viserys pede que as lutas internas cessem e Alicent exige justiça.',
      stillPath: '/nasv3ej4xd0An87ExkcIFL8ePvE.jpg',
      voteAverage: 8.017,
      voteCount: 59,
    },
    {
      id: 3846976,
      name: 'O Senhor das Marés',
      overview:
        'Seis anos depois. Com uma repentina crise de sucessão em Driftmark, Rhaenyra tenta chegar a um acordo com Rhaenys.',
      stillPath: '/iSL0p7ZF6X8cfoDwfAAPavVZFlC.jpg',
      voteAverage: 8.281,
      voteCount: 64,
    },
    {
      id: 3846978,
      name: 'O Conselho Verde',
      overview:
        'Enquanto Alicent pede ajuda a Cole e Aemond para localizar Aegon, Otto reúne as grandes casas de Westeros para que afirmem sua lealdade.',
      stillPath: '/hQV9o7EM9Ex8vobmM830HPrv924.jpg',
      voteAverage: 7.808,
      voteCount: 52,
    },
    {
      id: 3846982,
      name: 'A Rainha Negra',
      overview:
        'Enquanto lamenta uma perda trágica, Rhaenyra tenta manter o reino unido, e Daemon se prepara para a guerra.',
      stillPath: '/8QXW8N0FneCDf8PkTJ0HUXpuVin.jpg',
      voteAverage: 8.442,
      voteCount: 52,
    },
  ],
  name: 'Temporada 1',
  overview: '',
  posterPath: '/mTdCp6gkm0oFPgzZJBZAR6EAsya.jpg',
  voteAverage: 7.9,
};

const baseMockTVShowSeasonDetailsQueryResponse = () => {
  const request = {
    request: {
      query: TV_SHOW_SEASON_QUERY,
      variables: {
        input: {
          language: ISO6391Language.en,
          id: 1,
          season: 1,
        },
      },
    },
  };

  const result = {
    result: {
      data: {
        tvShowSeason,
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

export const mockQueryTVShowSeasonDetailsSuccess = () => {
  const query = baseMockTVShowSeasonDetailsQueryResponse();
  return [
    {
      ...query.request,
      ...query.result,
    },
  ];
};

export const mockQueryTVShowSeasonDetailsError = () => {
  const query = baseMockTVShowSeasonDetailsQueryResponse();
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
