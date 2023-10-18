import { TabRouteIds } from '@/navigation/components/tab-navigator/tabs';
import { NewsFilterLanguage } from '@app-types';

type Time =
  | 'year'
  | 'year_plural'
  | 'month'
  | 'month_plural'
  | 'day'
  | 'day_plural'
  | 'hour'
  | 'hour_plural'
  | 'minute'
  | 'minute_plural'
  | 'second'
  | 'second_plural';

export type Locale = {
  tabs: Record<TabRouteIds, string>;
  time: Record<Time, string>;
  news: {
    filterLanguagesModal: {
      ctaTitle: string;
      title: string;
    };
    languages: Record<NewsFilterLanguage, string>;
  };
};
