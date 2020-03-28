import { NewsFilterLanguage } from '../../types';

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

type Tabs = 'discover' | 'people' | 'quiz' | 'news';

export interface Locale {
  language: Record<NewsFilterLanguage, string>;
  newsFilterChooseLanguage: string;
  tabs: Record<Tabs, string>;
  time: Record<Time, string>;
}
