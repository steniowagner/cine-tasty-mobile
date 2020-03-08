import { TabID as HomeTabID } from '../../screens/home/routes/stack-routes';
import { TabID as PeopleTabID } from '../../screens/people/routes/stack-routes';
import { TabID as QuizTabID } from '../../screens/quiz/routes/stack-routes';
import { TabID as NewsTabID } from '../../screens/news/routes/stack-routes';
import { TabID as SettingsTabID } from '../../screens/settings/routes/stack-routes';

import { TabNavigatorItem } from '../../../types';

const items: TabNavigatorItem[] = [
  {
    id: HomeTabID,
    activeIcon: 'home-variant',
    inactiveIcon: 'home-variant-outline',
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
  {
    id: SettingsTabID,
    activeIcon: 'settings',
    inactiveIcon: 'settings-outline',
  },
];

export default items;
