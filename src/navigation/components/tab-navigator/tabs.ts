import { Icons } from '@common-components';

import { Routes } from '../../routes';

type TabRoutes =
  | Routes.Tabs.HOME
  | Routes.Tabs.FAMOUS
  | Routes.Tabs.QUIZ
  | Routes.Tabs.NEWS;

export type TabRouteIds = 'home' | 'famous' | 'quiz' | 'news';

export type TabNavigatorItem = {
  id: TabRoutes;
  inactiveIcon: Icons;
  activeIcon: Icons;
};

const tabs: TabNavigatorItem[] = [
  {
    id: Routes.Tabs.HOME,
    activeIcon: 'home-active',
    inactiveIcon: 'home-inactive',
  },
  {
    id: Routes.Tabs.FAMOUS,
    activeIcon: 'famous-active',
    inactiveIcon: 'famous-inactive',
  },
  {
    id: Routes.Tabs.QUIZ,
    activeIcon: 'quiz-active',
    inactiveIcon: 'quiz-inactive',
  },
  {
    id: Routes.Tabs.NEWS,
    activeIcon: 'news-active',
    inactiveIcon: 'news-inactive',
  },
];

export default tabs;
