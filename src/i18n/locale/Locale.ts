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
  tabs: Record<Tabs, string>;
  time: Record<Time, string>;
}
