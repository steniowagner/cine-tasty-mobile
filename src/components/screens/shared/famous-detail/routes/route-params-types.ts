import { SCREEN_ID as MOVIE_DETAIL } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-names';
import { MovieDetailExternalParams } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-params-types';

export type ExternalFamousDetailParams = {
  id: number;
};

export type FamousDetailParams = {
  [MOVIE_DETAIL]: MovieDetailExternalParams;
  FAMOUS_DETAIL: ExternalFamousDetailParams;
};
