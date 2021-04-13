import { TabID as HomeTabID } from '@components/screens/home/routes/stack-routes';
import { TabID as FamousTabID } from '@components/screens/famous/routes/stack-routes';
import { TabID as QuizTabID } from '@components/screens/quiz/routes/stack-routes';
import { TabID as NewsTabID } from '@components/screens/news/routes/stack-routes';

import * as Types from '@local-types';

const items: Types.TabNavigatorItem[] = [
  {
    id: HomeTabID,
    activeIcon: 'home-active',
    inactiveIcon: 'home-inactive',
  },
  {
    id: FamousTabID,
    activeIcon: 'famous-active',
    inactiveIcon: 'famous-inactive',
  },
  {
    id: QuizTabID,
    activeIcon: 'quiz-active',
    inactiveIcon: 'quiz-inactive',
  },
  {
    id: NewsTabID,
    activeIcon: 'news-active',
    inactiveIcon: 'news-inactive',
  },
];

export default items;
