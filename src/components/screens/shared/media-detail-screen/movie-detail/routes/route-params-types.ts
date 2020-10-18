import { ExternalFamousDetailParams } from 'components/screens/shared/famous-detail/routes/route-params-types';
import { SCREEN_ID as FAMOUS_DETAIL } from 'components/screens/shared/famous-detail/routes/route-names';

export type MovieDetailExternalParams = {
  genreIds?: string[];
  voteAverage?: number;
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

export type MovieDetailInternalternalParams = {
  [FAMOUS_DETAIL]: ExternalFamousDetailParams;
  MOVIE_DETAIL: MovieDetailExternalParams;
};
