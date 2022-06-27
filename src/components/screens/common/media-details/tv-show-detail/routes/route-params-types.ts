import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ReviewsParams} from '@src/components/screens/common/media-details/reviews/routes/route-params-types';
import {FamousDetailsParams} from '@src/components/screens/common/famous-details/routes/route-params-types';
import {Routes} from '@routes/routes';

type TVShowdetailStackParams = {
  [Routes.TVShow.DETAILS]: TVShowDetailParams;
  [Routes.TVShow.SEASONS]: SeasonsDetailsParams;
  [Routes.MediaDetail.REVIEWS]: ReviewsParams;
  [Routes.Famous.DETAILS]: FamousDetailsParams;
};

/** TVShow-Details-Params */
export type TVShowDetailParams = {
  voteAverage?: number;
  genreIds?: string[];
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

/** TVShow-Details-Stack-Props */
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
};

/** Seasons-Details-Params */
export type SeasonsDetailsParams = {
  numberOfSeasons: number;
  title: string;
  id: string;
};

export type SeasonsDetailsStackProps = {
  navigation: SeasonDetailsNavigationProp;
  route: SeasonDetailsRouteProp;
};

export type SeasonDetailsNavigationProp = StackNavigationProp<
  TVShowdetailStackParams,
  Routes.TVShow.SEASONS
>;

export type SeasonDetailsRouteProp = RouteProp<
  TVShowdetailStackParams,
  Routes.TVShow.SEASONS
>;
