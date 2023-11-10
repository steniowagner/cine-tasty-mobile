import { StackScreenProps } from '@react-navigation/stack';

import { FamousStackRoutes } from '@/components/stacks/famous/routes/route-params-types';
import { HomeStackRoutes } from '@/components/stacks/home/routes/route-params-types';
import { Routes } from '@/navigation';

export type FamousDetailsNavigationProps = StackScreenProps<
  FamousStackRoutes & HomeStackRoutes,
  Routes.Famous.DETAILS | Routes.Home.FAMOUS_DETAILS
>;

export type FamousDetailsProps = {
  profileImage?: string | null;
  name?: string | null;
  id?: number | null;
};
