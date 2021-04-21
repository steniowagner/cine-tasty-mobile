import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DefaultTheme } from 'styled-components';

import { MovieDetailParams } from '@components/screens/shared/media-detail/movie-detail/routes/route-params-types';
import { TVShowDetailParams } from '@components/screens/shared/media-detail/tv-show-detail/routes/route-params-types';
import { Routes } from '@routes/routes';

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

export type FamousDetailStackProps = {
  navigation: StackNavigationProp<FamousDetailStackParams, Routes.Famous.DETAILS>;
  route: RouteProp<FamousDetailStackParams, Routes.Famous.DETAILS>;
  theme: DefaultTheme;
};
