import { TabID as HomeTabID } from 'components/screens/discover/routes/stack-routes';
import { TabID as FamousTabID } from 'components/screens/famous/routes/stack-routes';
import { TabID as QuizTabID } from 'components/screens/quiz/routes/stack-routes';
import { TabID as NewsTabID } from 'components/screens/news/routes/stack-routes';

import { TabNavigatorItem } from 'types';

const items: TabNavigatorItem[] = [
  {
    id: HomeTabID,
    activeIcon: 'compass',
    inactiveIcon: 'compass-outline',
  },
  {
    id: FamousTabID,
    activeIcon: 'account-group',
    inactiveIcon: 'account-group-outline',
  },
  {
    id: QuizTabID,
    activeIcon: 'comment-question',
    inactiveIcon: 'comment-question-outline',
  },
  {
    id: NewsTabID,
    activeIcon: 'newspaper',
    inactiveIcon: 'newspaper',
  },
];

export default items;
