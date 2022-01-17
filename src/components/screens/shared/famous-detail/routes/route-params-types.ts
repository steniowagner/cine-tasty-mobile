import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DefaultTheme} from 'styled-components/native';

import {MovieDetailParams} from '@components/screens/shared/media-detail/movie-detail/routes/route-params-types';
import {TVShowDetailParams} from '@components/screens/shared/media-detail/tv-show-detail/routes/route-params-types';
import {Routes} from '@routes/routes';

type FamousDetailStackParams = {
  [Routes.TVShow.DETAILS]: TVShowDetailParams;
  [Routes.Famous.DETAILS]: FamousDetailParams;
  [Routes.Movie.DETAILS]: MovieDetailParams;
};

export type FamousDetailParams = {
  profileImage: string;
  name: string;
  id: number;
};

/** Famous-Detail-Stack-Props */
export type FamousDetailNavigationProp = StackNavigationProp<
  FamousDetailStackParams,
  Routes.Famous.DETAILS
>;
export type FamousDetailRouteProp = RouteProp<
  FamousDetailStackParams,
  Routes.Famous.DETAILS
>;

export type FamousDetailStackProps = {
  navigation: FamousDetailNavigationProp;
  route: FamousDetailRouteProp;
  theme: DefaultTheme;
};
