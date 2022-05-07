import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {Routes} from '@routes/routes';

type ReviewsStackParams = {
  [Routes.MediaDetail.REVIEWS]: ReviewsParams;
};

export type Review = {
  content: string;
  author: string;
};

export type ReviewsParams = {
  mediaTitle: string;
  reviews: Review[];
};

/** Reviews-Stack-Props */
export type ReviewsDetailNavigationProp = StackNavigationProp<
  ReviewsStackParams,
  Routes.MediaDetail.REVIEWS
>;
export type ReviewsDetailRouteProp = RouteProp<
  ReviewsStackParams,
  Routes.MediaDetail.REVIEWS
>;

export type ReviewsStackProps = {
  navigation: ReviewsDetailNavigationProp;
  route: ReviewsDetailRouteProp;
};
