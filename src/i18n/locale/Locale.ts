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

type ErrorType = 'network' | 'loadMoreNewsError' | 'reloadNewsError';

type ErrorDescription = {
  description: string;
  suggestion: string;
  title: string;
};

export interface Locale {
  errors: Record<ErrorType, Record<keyof ErrorDescription, string> | string>;
  tabs: Record<Tabs, string>;
  time: Record<Time, string>;
  news: {
    emptyList: Record<keyof ErrorDescription, string>;
    languages: Record<NewsFilterLanguage, string>;
    filterMessage: string;
  };
}
