import { StackScreenProps } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import { Routes } from '@/navigation';

export type MovieDetailsProps = StackScreenProps<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Home.MOVIE_DETAILS | Routes.Famous.MOVIE_DETAILS
>;

export type MovieDetailsNavigationProps = {
  voteAverage?: number | null;
  genres?: string[] | null;
  voteCount?: number | null;
  image?: string | null;
  title?: string | null;
  id?: number | null;
};
