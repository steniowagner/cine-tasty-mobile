import { ExternalFamousDetailParams } from 'components/screens/shared/famous-detail/routes/route-params-types';
import { SCREEN_ID as FAMOUS_DETAIL } from 'components/screens/shared/famous-detail/routes/route-names';

import { ReviewsExternalParams } from 'components/screens/shared/media-detail-screen/reviews/routes/route-params-types';
import { SCREEN_ID as REVIEWS } from 'components/screens/shared/media-detail-screen/reviews/routes/route-names';

import { TVShowSeasonsNavigationParams } from 'components/screens/shared/tv-show-seasons-screen/routes/route-params-types';
import { SCREEN_ID as TV_SHOW_SEASONS } from 'components/screens/shared/tv-show-seasons-screen/routes/stack-routes';

export type TVShowDetailExternalParams = {
  voteAverage?: number;
  genreIds?: string[];
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

export type MovieDetailInternalternalParams = {
  [TV_SHOW_SEASONS]: TVShowSeasonsNavigationParams;
  [FAMOUS_DETAIL]: ExternalFamousDetailParams;
  TV_SHOW_DETAIL: TVShowDetailExternalParams;
  [REVIEWS]: ReviewsExternalParams;
};
