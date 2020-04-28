import { TabID as HomeTabID } from 'components/screens/home/routes/stack-routes';
import { TabID as PeopleTabID } from 'components/screens/people/routes/stack-routes';
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
    id: PeopleTabID,
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
