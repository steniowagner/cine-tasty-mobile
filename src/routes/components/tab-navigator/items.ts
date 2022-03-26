import {Routes} from '@routes/routes';

import * as Types from '@local-types';

const items: Types.TabNavigatorItem[] = [
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

export default items;
