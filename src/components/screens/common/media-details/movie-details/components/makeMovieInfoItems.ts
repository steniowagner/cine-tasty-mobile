import {QueryResult} from '@apollo/client';

import {formatCurrency, formatDate} from '@utils';
import * as SchemaTypes from '@schema-types';

export const makeMovieInfoItems = (
  queryResult: QueryResult<
    SchemaTypes.MovieDetail,
    SchemaTypes.MovieDetailVariables
  >,
  texts: Record<string, string>,
) => [
  {
    value: queryResult.data?.movie?.originalTitle || '-',
    title: texts.originalTitle,
  },
  {
    value: formatDate(queryResult.data?.movie?.releaseDate),
    title: texts.releaseDate,
  },
  {
    value: formatCurrency(queryResult.data?.movie?.budget),
    title: texts.budget,
  },
  {
    value: formatCurrency(queryResult.data?.movie?.revenue),
    title: texts.revenue,
  },
  {
    value: queryResult.data?.movie?.productionCountries.length
      ? queryResult.data?.movie?.productionCountries.join(', ')
      : '-',
    title: texts.productionCountries,
  },
  {
    value: queryResult.data?.movie?.spokenLanguages.length
      ? queryResult.data?.movie?.spokenLanguages.join(', ')
      : '-',
    title: texts.spokenLanguages,
  },
];
