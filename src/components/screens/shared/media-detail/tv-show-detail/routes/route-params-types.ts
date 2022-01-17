import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DefaultTheme} from 'styled-components/native';

import {TVShowSeasonsParams} from '@components/screens/shared/tv-show-seasons/routes/route-params-types';
import {ReviewsParams} from '@components/screens/shared/media-detail/reviews/routes/route-params-types';
import {FamousDetailParams} from '@components/screens/shared/famous-detail/routes/route-params-types';
import {Routes} from '@routes/routes';

type TVShowdetailStackParams = {
  [Routes.TVShow.DETAILS]: TVShowDetailParams;
  [Routes.TVShow.SEASONS]: TVShowSeasonsParams;
  [Routes.MediaDetail.REVIEWS]: ReviewsParams;
  [Routes.Famous.DETAILS]: FamousDetailParams;
};

export type TVShowDetailParams = {
  voteAverage?: number;
  genreIds?: string[];
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

/** TVShow-Detail-Stack-Props */
export type TVShowDetailNavigationProp = StackNavigationProp<
  TVShowdetailStackParams,
  Routes.TVShow.DETAILS
>;

export type TVShowDetailRouteProp = RouteProp<
  TVShowdetailStackParams,
  Routes.TVShow.DETAILS
>;

export type TVShowDetailStackProps = {
  navigation: TVShowDetailNavigationProp;
  route: TVShowDetailRouteProp;
  theme: DefaultTheme;
};
