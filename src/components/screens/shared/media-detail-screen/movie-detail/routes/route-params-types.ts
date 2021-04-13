import { ExternalFamousDetailParams } from '@components/screens/shared/famous-detail/routes/route-params-types';
import { SCREEN_ID as FAMOUS_DETAIL } from '@components/screens/shared/famous-detail/routes/route-names';

import { ReviewsExternalParams } from '@components/screens/shared/media-detail-screen/reviews/routes/route-params-types';
import { SCREEN_ID as REVIEWS } from '@components/screens/shared/media-detail-screen/reviews/routes/route-names';

export type MovieDetailExternalParams = {
  voteAverage?: number;
  genreIds?: string[];
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

export type MovieDetailInternalternalParams = {
  [FAMOUS_DETAIL]: ExternalFamousDetailParams;
  MOVIE_DETAIL: MovieDetailExternalParams;
  [REVIEWS]: ReviewsExternalParams;
};
