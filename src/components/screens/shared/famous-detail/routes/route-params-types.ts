import { SCREEN_ID as MOVIE_DETAIL_STACK_ID } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-names';
import { MovieDetailExternalParams } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-params-types';

export type FamousDetailParams = {
  [MOVIE_DETAIL_STACK_ID]: MovieDetailExternalParams;
  id: number;
};
