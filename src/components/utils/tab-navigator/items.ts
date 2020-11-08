import { TabID as HomeTabID } from 'components/screens/home/routes/stack-routes';
import { TabID as FamousTabID } from 'components/screens/famous/routes/stack-routes';
import { TabID as QuizTabID } from 'components/screens/quiz/routes/stack-routes';
import { TabID as NewsTabID } from 'components/screens/news/routes/stack-routes';

import { TabNavigatorItem } from 'types';

const items: TabNavigatorItem[] = [
  {
    id: HomeTabID,
    icon: 'home-variant-outline',
  },
  {
    id: FamousTabID,
    icon: 'account-star',
  },
  {
    id: QuizTabID,
    icon: 'comment-question',
  },
  {
    id: NewsTabID,
    icon: 'newspaper',
  },
];

export default items;
