import { MovieDetailExternalParams } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-params-types';
import { SCREEN_ID as MOVIE_DETAIL } from 'components/screens/shared/media-detail-screen/movie-detail/routes/route-names';

import { TVShowDetailExternalParams } from 'components/screens/shared/media-detail-screen/tv-show-detail/routes/route-params-types';
import { SCREEN_ID as TV_SHOW_DETAIL } from 'components/screens/shared/media-detail-screen/tv-show-detail/routes/route-names';

export type ExternalFamousDetailParams = {
  profileImage: string;
  name: string;
  id: number;
};

export type FamousDetailParams = {
  [TV_SHOW_DETAIL]: TVShowDetailExternalParams;
  [MOVIE_DETAIL]: MovieDetailExternalParams;
  FAMOUS_DETAIL: ExternalFamousDetailParams;
};
