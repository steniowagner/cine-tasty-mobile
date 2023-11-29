import { StackScreenProps } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import { Routes } from '@/navigation';

export type TVShowSeasonProps = StackScreenProps<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Home.TV_SHOW_SEASON | Routes.Famous.TV_SHOW_SEASON
>;

export type TVShowSeasonNavigationProps = {
  season: number;
  id?: number | null;
  name?: string | null;
};
