import {StackNavigationProp} from '@react-navigation/stack';
import {DefaultTheme} from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';

import {FamousDetailParams} from '@src/components/screens/common/famous-detail/routes/route-params-types';
import {ReviewsParams} from '@src/components/screens/common/media-detail/reviews/routes/route-params-types';
import {Routes} from '@routes/routes';

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

/** Movie-Detail-Stack-Props */
export type MovieDetailNavigationProp = StackNavigationProp<
  MovieDetailStackParams,
  Routes.Movie.DETAILS
>;

export type MovieDetailRouteProp = RouteProp<
  MovieDetailStackParams,
  Routes.Movie.DETAILS
>;

export type MovieDetailStackProps = {
  navigation: MovieDetailNavigationProp;
  route: MovieDetailRouteProp;
  theme: DefaultTheme;
};
