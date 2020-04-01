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

type ErrorType = 'network';

type ErrorDescription = {
  description: string;
  suggestion: string;
  title: string;
};

export interface Locale {
  errors: Record<ErrorType, Record<keyof ErrorDescription, string>>;
  language: Record<NewsFilterLanguage, string>;
  newsFilterChooseLanguage: string;
  tabs: Record<Tabs, string>;
  time: Record<Time, string>;
}
