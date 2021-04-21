import { Routes } from '@routes/routes';

import * as Types from '@local-types';

const items: Types.TabNavigatorItem[] = [
  {
    id: Routes.Home.HOME,
    activeIcon: 'home-active',
    inactiveIcon: 'home-inactive',
  },
  {
    id: Routes.Famous.FAMOUS,
    activeIcon: 'famous-active',
    inactiveIcon: 'famous-inactive',
  },
  {
    id: Routes.Quiz.QUIZ,
    activeIcon: 'quiz-active',
    inactiveIcon: 'quiz-inactive',
  },
  {
    id: Routes.News.NEWS,
    activeIcon: 'news-active',
    inactiveIcon: 'news-inactive',
  },
];

export default items;
