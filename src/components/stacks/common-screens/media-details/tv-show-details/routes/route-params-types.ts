import { StackScreenProps } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import { Routes } from '@/navigation';

export type TVShowDetailsProps = StackScreenProps<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Home.TV_SHOW_DETAILS | Routes.Famous.TV_SHOW_DETAILS
>;

export type TVShowDetailsNavigationProps = {
  voteAverage?: number | null;
  genres?: string[] | null;
  voteCount?: number | null;
  image?: string | null;
  title?: string | null;
  id?: number | null;
};
