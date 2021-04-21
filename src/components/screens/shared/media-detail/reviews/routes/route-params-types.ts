import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Routes } from '@routes/routes';

type ReviewsStackParams = {
  [Routes.MediaDetail.REVIEWS]: ReviewsParams;
};

type Review = {
  content: string;
  author: string;
};

export type ReviewsParams = {
  mediaTitle: string;
  reviews: Review[];
};

export type ReviewsStackProps = {
  navigation: StackNavigationProp<ReviewsStackParams, Routes.MediaDetail.REVIEWS>;
  route: RouteProp<ReviewsStackParams, Routes.MediaDetail.REVIEWS>;
};
