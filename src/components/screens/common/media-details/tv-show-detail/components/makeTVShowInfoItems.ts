import {QueryResult} from '@apollo/client';

import * as SchemaTypes from '@schema-types';
import {formatDate} from '@utils';

export const makeTVShowsInfoItems = (
  queryResult: QueryResult<
    SchemaTypes.TVShowDetail,
    SchemaTypes.TVShowDetailVariables
  >,
  texts: Record<string, string>,
) => [
  {
    title: texts.originalTitle,
    value: queryResult.data?.tvShow?.name || '-',
  },
  {
    value: queryResult.data?.tvShow?.originalLanguage || '-',
    title: texts.originalLanguage,
  },
  {
    title: texts.numberOfEpisodes,
    value: queryResult.data?.tvShow?.numberOfEpisodes
      ? String(queryResult.data?.tvShow?.numberOfEpisodes)
      : '-',
  },
  {
    title: texts.numberOfSeasons,
    value: queryResult.data?.tvShow.numberOfSeasons
      ? String(queryResult.data?.tvShow.numberOfSeasons)
      : '-',
  },
  {
    title: texts.episodeRuntime,
    value: queryResult.data?.tvShow.episodeRunTime.length
      ? queryResult.data?.tvShow.episodeRunTime.join(', ').concat('min')
      : '-',
  },
  {
    title: texts.originalCountry,
    value: queryResult.data?.tvShow?.originCountry
      ? queryResult.data?.tvShow?.originCountry.join(', ')
      : '-',
  },
  {
    title: texts.firstAirDate,
    value: formatDate(queryResult.data?.tvShow?.firstAirDate) || '-',
  },
  {
    title: texts.lastAirDate,
    value: formatDate(queryResult.data?.tvShow?.lastAirDate) || '-',
  },
];
