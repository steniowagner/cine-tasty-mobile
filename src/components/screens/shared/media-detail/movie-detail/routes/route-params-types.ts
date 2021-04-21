import { StackNavigationProp } from '@react-navigation/stack';
import { DefaultTheme } from 'styled-components';
import { RouteProp } from '@react-navigation/native';

import { FamousDetailParams } from '@components/screens/shared/famous-detail/routes/route-params-types';
import { ReviewsParams } from '@components/screens/shared/media-detail/reviews/routes/route-params-types';
import { Routes } from '@routes/routes';

type MovieDetailStackParams = {
  [Routes.Famous.DETAILS]: FamousDetailParams;
  [Routes.MediaDetail.REVIEWS]: ReviewsParams;
  [Routes.Movie.DETAILS]: MovieDetailParams;
};

export type MovieDetailParams = {
  voteAverage?: number;
  genreIds?: string[];
  posterPath: string;
  voteCount?: number;
  title: string;
  id: number;
};

export type MovieDetailStackProps = {
  navigation: StackNavigationProp<MovieDetailStackParams, Routes.Movie.DETAILS>;
  route: RouteProp<MovieDetailStackParams, Routes.Movie.DETAILS>;
  theme: DefaultTheme;
};
